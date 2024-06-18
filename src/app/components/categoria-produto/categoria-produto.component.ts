import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaProdutoService } from '../../services/categoria-produto.service';
import { CategoriaProduto } from '../../model/categoria-produto';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-categoria-produto',
  templateUrl: './categoria-produto.component.html',
  styleUrl: './categoria-produto.component.css'
})

export class CategoriaProdutoComponent implements OnInit{

  categorias = new Array<CategoriaProduto>();
  catProdForm: FormGroup;
  private categoria;
  pesquisa: string = "";
  quantidade: number = 0;
  arrayNumber: number[] = [];
  paginaAtual: number = 1;

  constructor(private fb: FormBuilder, private categoriaProdutoService: CategoriaProdutoService, private loginService: LoginService){
    this.categoria = new CategoriaProduto();
    /*Pegar dados do formulário*/
    this.catProdForm = this.fb.group({
      id:[],
      nomeDesc:[null, Validators.required],
      empresa:this.loginService.objetoEmpresa()
    });

  }

  /**
   * Executa assim que a tela abre
   */
  ngOnInit(): void {

    this.categoriaProdutoService.qtdPagina().subscribe({
      next: (res) =>{
        this.quantidade = Number(res);
        // console.log('Quantidade de páginas: ' + this.quantidade);
        this.arrayNumber = new Array(this.quantidade).fill(0).map((x, i) => i);
        console.log(this.arrayNumber);
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.listaCategorias(1);
  }

  novo(): void {
    this.catProdForm = this.fb.group({
      id:[],
      nomeDesc:[null, Validators.required],
      empresa:this.loginService.objetoEmpresa()
    });
  }

  listaCategorias(pagina: number) {
    this.categoriaProdutoService.listarCategoriaProduto(pagina).subscribe({ 
      next: (res) =>{
        this.categorias = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

   

  /*Tranforma os dados do form em objeto*/
  cadProdObjeto(): CategoriaProduto {
    return {
      id: this.catProdForm.get("id")?.value!,
      nomeDesc: this.catProdForm.get("nomeDesc")?.value!,
      empresa: this.catProdForm.get("empresa")?.value!,
    }
  }

  cadProdCategoria():void {
    const categoria = this.cadProdObjeto();
    //console.log(categoria);
    this.categoriaProdutoService.salvarCategoriaProduto(categoria);
    this.novo();
    this.listaCategorias(this.paginaAtual);
  }

  editarCategoria(categoria: CategoriaProduto) {
    console.log(categoria);
    const cpEdit = this.categoriaProdutoService.buscarPorId(categoria?.id!).subscribe({
      next: (res) => {
        this.categoria = res;
        this.catProdForm = this.fb.group({
          id:[this.categoria.id],
          nomeDesc:[this.categoria.nomeDesc, Validators.required],
          empresa:this.loginService.objetoEmpresa()
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  excluirCategoria(categoria: CategoriaProduto) {
    const confimacao = confirm("Deseja realmente excluir?");
    if (confimacao) {
      this.categoriaProdutoService.deletar(categoria);
      this.listaCategorias(this.paginaAtual);
    }
  }

  setPesquisa(descricao: string):void {
    this.pesquisa = descricao;
  }

  pesquisar():void {

    /** se não tiver nada na caixa de pesqusa traga tudo */
    if (this.pesquisa.length <= 0){
      this.listaCategorias(this.paginaAtual);
      return;
    }

    this.categoriaProdutoService.buscarPorDescCategoria(this.pesquisa).subscribe({
      next: (res) =>{
        this.categorias = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  buscarPagina(p: number) {
    // console.log(p);
    this.paginaAtual = p;
    this.listaCategorias(p);
  }

  voltar() {
    if (this.paginaAtual > 1){
      this.paginaAtual = this.paginaAtual - 1;
      this.buscarPagina(this.paginaAtual);
    }
  }

  avancar() {
    if (this.paginaAtual < this.quantidade){
      this.paginaAtual = this.paginaAtual + 1;
      this.buscarPagina(this.paginaAtual);
    }
  }

}
