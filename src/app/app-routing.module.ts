import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
  { path: 'categorias', loadChildren: './pages/categories/categories.module#CategoriesModule' },
  { path: 'lancamentos', loadChildren: './pages/entries/entries.module#EntriesModule' },
  { path: 'relatorios', loadChildren: './pages/reports/reports.module#ReportsModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
