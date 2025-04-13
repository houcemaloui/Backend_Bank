import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/User.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('container') container!: ElementRef;

  isActive = false; // Gestion de l'état pour afficher le formulaire d'inscription ou de connexion
  username: string = '';
  password: string = '';
  email: string = '';
  confirmPassword: string = '';
  message: string = ''; // Message d'état pour informer l'utilisateur
  errorMessage: string = '';  // Pour afficher les messages d'erreur
  firstname: string = '';
  lastname: string = '';

  constructor(private authService: UserService, private router: Router) {}

  toggleForm() {
    this.isActive = !this.isActive;
    const containerElement = this.container.nativeElement;
    containerElement.classList.toggle('active', this.isActive);
    this.message = ''; // Reset message on form switch
  }

  onSubmitSignIn() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        this.router.navigate(['/dashboard']); // Navigation après un login réussi
      },
      error => {
        console.error('Login failed', error);
        this.message = 'Invalid credentials. Please try again.'; // Affichage du message d'erreur
      }
    );
  }

  onSubmitSignUp() {
    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match!';
      return;
    }

    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe(
      (response: any) => {
        console.log('Registration successful', response);
        this.message = 'Registration successful. You can now sign in.'; // Affichage du message de succès
        this.toggleForm(); // Passer au formulaire de connexion après une inscription réussie
      },
      (error: any) => {
        console.error('Registration failed', error);
        this.message = 'Registration failed. Please try again.'; // Message d'erreur si l'inscription échoue
      }
    );
  }
}
