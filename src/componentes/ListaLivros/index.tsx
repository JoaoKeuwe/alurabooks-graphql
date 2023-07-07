import { ICategoria } from '../../interfaces/ICategoria';
import CardLivro from '../CardLivro';

import './ListaLivros.css';
import { gql, useQuery } from '@apollo/client';
import { ILivro } from '../../interfaces/ILivro';
import { AbBotao, AbCampoTexto } from 'ds-alurabooks';
import { FormEventHandler, useState } from 'react';

interface ListaLivrosProps {
  categoria: ICategoria;
}

const OBTER_LIVROS = gql`
  query ObterLivros($categoriaId: Int, $titulo: String) {
    livros(categoriaId: $categoriaId, titulo: $titulo) {
      id
      slug
      titulo
      imagemCapa
      opcoesCompra {
        id
        preco
      }
    }
  }
`;

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const [textoBusca, setTextoBusca] = useState('')

  const {data, refetch} = useQuery<{livros: ILivro[]}>(OBTER_LIVROS, {
    variables: {
      categoriaId: categoria.id
      
    }
  })
  
  const searchBooks: FormEventHandler<HTMLFormElement> | undefined = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (textoBusca) {
      refetch({
        categoriaId: categoria.id,
        titulo: textoBusca
      })
    }
  }
  return (
    <section>
      <form onSubmit={ searchBooks} style={{maxWidth: '80%', margin: '0 auto', textAlign: 'center'}}>
        <AbCampoTexto value={textoBusca} onChange={setTextoBusca} placeholder='digite o titulo ou autor do livro'/>
        <div style={{marginTop: '16px'}}>
          <AbBotao texto='buscar' />
        </div>
      </form>
      <div  className="livros">

      {data?.livros.map((livro) => (
        <CardLivro livro={livro} key={livro.id} />
      ))}
      </div>
    </section>
  );
};

export default ListaLivros;
