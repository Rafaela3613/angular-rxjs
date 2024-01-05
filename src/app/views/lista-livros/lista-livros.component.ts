import { switchMap, map, tap, filter, debounceTime, throwError, catchError, EMPTY, of } from 'rxjs';
import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';
import { Item, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { FormControl } from '@angular/forms';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl();
  mensagemErro = ''
  livrosResultado: LivrosResultado;
  listaLivros: LivroVolumeInfo[];

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    tap(() => {
      console.log('Fluxo inicial de dados');
    }),
    filter(
      (valorDigitado) => valorDigitado.length >= 3
    ),
    switchMap(
      (valorDigitado) => this.service.buscar(valorDigitado)
    ),
    map(resultado => this.livrosResultado = resultado),
    map(resultado => resultado.items ?? []),
    tap(console.log),
    map(items => this.listaLivros =   this.livrosResultadoParaLivros(items)),
    catchError(erro =>
      { console.log(erro);
        return throwError(() =>
        new Error(this.mensagemErro = `Ops, ocorreu um erro! Recarregue a aplicação!`));
      })
  );

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

}

