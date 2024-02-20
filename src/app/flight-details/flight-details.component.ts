import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { FlightDetailsService } from '../services/flight-details/flight-details.service';
import { FlightInfoPayload } from '../models/flight-info-payload.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css'],
})
export class FlightDetailsComponent {
  flightForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private flightDetailsService: FlightDetailsService,
    private snackBar: MatSnackBar
  ) {
    this.flightForm = this.fb.group({
      airline: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      flightNumber: ['', Validators.required],
      numOfGuests: ['', [Validators.required, Validators.min(1)]],
      comments: [''],
    });
  }

  //method to be triggered when submit button is clicked
  onSubmit() {
    if (this.flightForm.valid) {
      console.log(this.flightForm.value);
      const flightInfo: FlightInfoPayload = this.flightForm.value;
      this.flightDetailsService.submitFlightDetails(flightInfo).subscribe({
        next: (response) => {
          console.log(response);
          this.snackBar.open('Flight details submitted successfully', 'Close', {
            duration: 5000,
          });
          this.flightForm.reset();
          Object.keys(this.flightForm.controls).forEach((key) => {
            this.flightForm.get(key)?.setErrors(null);
          });
        },
        error: (error) => {
          console.error('Error submitting flight details', error);
          this.snackBar.open('Error submitting flight details', 'Close', {
            duration: 5000,
          });
        },
      });
    }
  }

  //method to be triggered when logout button is clicked
  logout() {
    this.authService.logout();
  }
}
