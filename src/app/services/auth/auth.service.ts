import { Injectable } from '@angular/core';
import {
  getAuth,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signOut,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private app = initializeApp(environment.firebaseConfig);
  private afAuth = getAuth(this.app);
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();
  public isLoggedIn$: Observable<boolean>;

  constructor(private router: Router, private snackBar: MatSnackBar) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));

    // Initialize the authentication state
    onAuthStateChanged(this.afAuth, (user) => {
      this.userSubject.next(user);
    });
  }

  // Google Login Method
  googleLogin(): Promise<void> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.afAuth, provider)
      .then((result: UserCredential) => {
        this.router.navigate(['/flight-details']);

        console.log(`You're signed in as ${result.user.displayName}`);
        // Notify the user on successfull Login through a Material UI snackbar
        this.snackBar.open(`Welcome, ${result.user.displayName}!`, 'Close', {
          duration: 5000,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(
          `Error during sign in with Google: ${errorMessage} (Code: ${errorCode})`
        );
        // Notify the user on unsuccessfull Login through a Material UI snackbar
        this.snackBar.open(`Sign in failed: ${errorMessage}`, 'Close', {
          duration: 5000,
        });
      });
  }

  //logout method
  logout(): Promise<void> {
    return signOut(this.afAuth)
      .then(() => {
        this.router.navigate(['/login']);
        console.log("You've been signed out successfully.");
      })
      .catch((error) => {
        console.error(`Error signing out: ${error.message}`);
      });
  }

  // Check Auth Status
  isAuthenticated(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
