import {
    Component,
    EventEmitter,
    Input,
    Output,
    OnInit} from "angular2/core";
import {NgForm}     from "angular2/common";
import {Json} from "angular2/src/facade/lang";
import {Observable} from "rxjs/Observable";

import {Cake}       from "./cake";
import {CakeService} from "./cake.service";

declare var jQuery;

@Component({
    selector: "import-cake-form",
    templateUrl: "templates/import-cake-form.component.html",
})

export class ImportCakeFormComponent implements OnInit {
    userId = JSON.parse(localStorage.getItem("profile")).user_id; // must be defined first

    @Output() saved = new EventEmitter<Cake>();
    @Output() previewed = new EventEmitter<Cake>();
    @Input() active = false;
    @Input() isModal;
    @Input() modelString = "";
    @Input() header = "Paste a Recipe Here";
    model = new Cake(0, false, false, this.userId, "", "", "", "", [], []);
    tooltipTitle = `
        <p style='text-align:left; padding: 5px; margin-bottom: 0'>
            <b>How To</b>:<br>
            - Name is required<br>
            - <b>Type 'none' or 'None' to <i>leave blank</i></b><br>
            <br>
            <b>Template</b>:
        </p>
<pre style='margin-top: 0; text-align: left'>*name*

*description*

*ingredient #1*
*ingredient #2*
*ingredient #3*

*step #1*
*step #2*</pre>
        `;

    constructor(private _cakeService:CakeService) {
    }

    ngOnInit() {
        jQuery("#importValidMessage").empty();
    }

    clearForm() {
        // TODO: Remove when there's a better way to reset the model
        this.model = new Cake(0, false, false, this.userId,
            "", "", "", "", [], []);
        this.modelString = "";
        jQuery("#importValidMessage").empty();
        jQuery("#importErrorMessage").empty();
    }

    updateTextArea(input:string) {
        this.modelString = input;
    }

    togglePublicity() {
        if (this.model.isPublic != null) {
            this.model.isPublic = !this.model.isPublic;
            (<HTMLInputElement> document.getElementById("publicToggleImport")).checked
                = this.model.isPublic;
        } else {
            this.model.isPublic = true;
            (<HTMLInputElement> document.getElementById("publicToggleImport")).checked
                = true;
        }
    }

    onPreview() {
        jQuery("#importErrorMessage").empty();
        jQuery("#importValidMessage").empty();
        if (this.model.name.length < 5) {
            let html = "<ul class='list'>";
            html += "<li>Cake name must have at least 5 characters</li>";
            html += "</ul>";
            jQuery("#importErrorMessage").append(html);
        }
        else {
            let html = "<ul class='list'>";
            html += "<li>You're good to go!</li>";
            html += "</ul>";
            jQuery("#importValidMessage").append(html);
        }
        this.previewed.emit(this.model);
    }

    parsePreview() {
        this.model = new Cake(0, this.model.isPublic, false, this.userId, "", "", "", "", [], []);
        // split into list of elements
        let cursor;
        let isIngr = true;
        let indexIngr = 0;
        let isStep = false;
        let indexStep = 0;
        let modelArray = this.modelString.split("\n");

        if (modelArray[0]) {
            this.model.name = modelArray[0];
        }

        if (this.model.name) {
            if (modelArray[2] && modelArray[2].toLowerCase() != "none") {
                this.model.description = modelArray[2];
            }

            cursor = 4;
            while (isIngr) {
                if (modelArray[cursor] && modelArray[cursor].toLowerCase() != "none") {
                    this.model.ingredients[indexIngr] = {
                        "index": indexIngr,
                        "value": modelArray[cursor]
                    };
                } else if (modelArray[cursor] && modelArray[cursor].toLowerCase() == "none") {
                    this.model.ingredients = [];
                }
                else {
                    isIngr = false;
                    break;
                }
                indexIngr++;
                cursor++;
            }

            cursor++;
            isStep = true;
            while (isStep) {
                if (modelArray[cursor] && modelArray[cursor].toLowerCase() != "none") {
                    this.model.steps[indexStep] = {
                        "index": indexStep,
                        "value": modelArray[cursor]
                    };
                } else if (modelArray[cursor] && modelArray[cursor].toLowerCase() == "none") {
                    this.model.steps = [];
                }
                else {
                    isStep = false;
                    break;
                }
                indexStep++;
                cursor++;
            }
        }

        this.onPreview();
    }

    importCake():Observable<Cake> {
        if (this.isEmptyString(this.modelString) || this.isEmptyString(this.model.name)) {
            return;
        }
        this.parsePreview();
        this._cakeService.addCake(JSON.stringify(this.model))
            .subscribe(res => this.saved.emit(res));
        this.clearForm();
    }

    /********************
     * Helper Functions *
     ********************/
    isEmptyString(str:string) {
        return str == "" || str == null;
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        return JSON.stringify(this.model);
    }
}