import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common"; // Import CommonModule

@Component({
  selector: "app-demographic",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./demographic.component.html",
  styleUrl: "./demographic.component.css",
})
export class DemographicComponent {
  parentForm: FormGroup;

  // Sample user data
  users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Bob Johnson" },
  ];

  questions = [
    {
      id: "ethnicity",
      label: "Are you Hispanic or Latino?",
      options: [
        { name: "Hispanic or Latino", hasSubOptions: true },
        { name: "Not Hispanic or Latino", hasSubOptions: false },
        { name: "I do not wish to provide my ethnicity", hasSubOptions: false },
      ],
      subOptions: [
        "Cuban",
        "Mexican",
        "Puerto Rican",
        "Other Hispanic or Latino",
      ],
    },
    {
      id: "gender",
      label: "What is your Sex/Gender?",
      options: [
        { name: "Please specify your Sex/Gender", hasSubOptions: true },
        {
          name: "I do not wish to provide my Sex/Gender",
          hasSubOptions: false,
        },
      ],
    },
    {
      id: "continent",
      label: "Select your Continent",
      options: [
        { name: "European", hasSubOptions: true },
        { name: "American", hasSubOptions: true },
        { name: "Asian", hasSubOptions: true },
      ],
      subOptions: {
        European: ["A", "B", "C"],
        American: ["D", "E", "F"],
        Asian: ["G", "H", "J"],
      },
    },
  ];

  constructor(private fb: FormBuilder) {
    this.parentForm = this.fb.group({
      users: this.fb.array([]),
    });

    this.initializeUserForms();
  }

  // Initialize form groups for each user
  initializeUserForms() {
    const usersFormArray = this.parentForm.get("users") as FormArray;

    this.users.forEach(() => {
      usersFormArray.push(
        this.fb.group({
          ethnicity: [""],
          ethnicitySubOptions: this.fb.array([]),
          otherEthnicity: [""],
          gender: [""],
          genderInput: [""],
          continent: [""],
          continentSubOptions: this.fb.array([]),
        })
      );
    });
  }

  // Getter for users FormArray
  get usersFormArray() {
    return this.parentForm.get("users") as FormArray;
  }

  // Handle radio selection to load sub-options for ethnicity/continent
  onOptionSelected(userIndex: number, questionId: string, optionName: string) {
    const userFormGroup = this.usersFormArray.at(userIndex) as FormGroup;

    if (questionId === "ethnicity") {
      const subOptionsArray = userFormGroup.get(
        "ethnicitySubOptions"
      ) as FormArray;
      subOptionsArray.clear();

      if (optionName === "Hispanic or Latino") {
        (this.questions[0].subOptions as string[])?.forEach(() =>
          subOptionsArray.push(this.fb.control(false))
        );
      }
    } else if (questionId === "continent") {
      const subOptionsArray = userFormGroup.get(
        "continentSubOptions"
      ) as FormArray;
      subOptionsArray.clear();

      const subOptions = this.questions[2].subOptions as {
        [key: string]: string[];
      };
      const selectedSubOptions = subOptions[optionName];
      if (selectedSubOptions) {
        selectedSubOptions.forEach(() =>
          subOptionsArray.push(this.fb.control(false))
        );
      }
      if (selectedSubOptions) {
        selectedSubOptions.forEach(() =>
          subOptionsArray.push(this.fb.control(false))
        );
      }
    }
  }

  getContinentSubOptionsControls(userIndex: number) {
    return (
      this.usersFormArray.at(userIndex).get("continentSubOptions") as FormArray
    ).controls;
  }

  getEthnicitySubOptionsControls(userIndex: number) {
    return (
      this.usersFormArray.at(userIndex).get("ethnicitySubOptions") as FormArray
    ).controls;
  }

  onSubmit() {
    console.log("Form Data:", this.parentForm.value);
  }
}
