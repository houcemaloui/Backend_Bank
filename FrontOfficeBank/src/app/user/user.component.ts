import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/User.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = []; // ✅ Liste filtrée
  userForm: FormGroup;
  showForm = false;
  searchTerm: string = ''; // ✅ Terme de recherche

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = data; // ✅ Initialisation de la liste filtrée
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addUser() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe(() => {
        this.loadUsers();
        this.userForm.reset();
        this.showForm = false;
      });
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  filterUsers() {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = [...this.users]; // Si vide, afficher tous les utilisateurs
      return;
    }
  
    this.filteredUsers = this.users.filter(user =>
      user.nom?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.prenom?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );}
}
