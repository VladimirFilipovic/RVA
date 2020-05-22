import { AutorComponent } from './components/core/autor/autor.component';
import { AboutComponent } from './components/core/about/about.component';
import { HomeComponent } from './components/core/home/home.component';
import { StatusComponent } from './components/status/status.component';
import { StudentComponent } from './components/student/student.component';
import { DepartmanComponent } from './components/departman/departman.component';
import { FakultetComponent } from './components/fakultet/fakultet.component';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'

const Routes = [
  {path: 'fakultet', component: FakultetComponent},
  {path: 'departman', component: DepartmanComponent},
  {path: 'student', component: StudentComponent},
  {path: 'status', component: StatusComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'author', component: AutorComponent},
  {path: '', redirectTo: '/home',pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
