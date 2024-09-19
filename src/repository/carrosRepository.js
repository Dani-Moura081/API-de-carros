import con from "./connection.js";

export async function inserirCarro(carro) {
    const comando = `
    insert into tb_carro (ds_marca, ds_modelo, nr_ano, ds_cor, vl_preco, dt_inclusao)
        values(? ? ? ? ? ?)

    `
    let resposta = await con.query(comando, [carro.marca, carro.modelo, carro.ano, carro.cor, carro.preco, carro.inclusao])
    let info = resposta[0]

    return info.insertId
}

export async function consultarCarro() {
    const comando = `
    select 
        id_carro,
        ds_marca,
        ds_modelo,
        nr_ano,
        vl_preco,
        dt_inclusao
    from tb_carro
 `

    let resposta = await con.query(comando);
    let registros = resposta(0)

    return registros
}

export async function alterarCarro(carro) {
    const comando = `
    update tb_carro
        set
            id_carro = ?,
            ds_marca = ?,
            ds_modelo = ?,
            nr_ano = ?,
            vl_preco = ?,
            dt_inclusao = ?
    where id_carro = ?
    `

    let resposta = await con.query(comando, [carro.marca, carro.modelo, carro.ano, carro.cor, carro.preco, carro.inclusao, id])
    let info = resposta[0]
    return info.affectedRows;
}

export async function removerCarro(carro) {
    const comando = `
        delete from tb_carro
            where id_carro = ?
    `

    let resposta = await con.query(comando[id])
    let info = resposta[0]
    return info.affectedRows
}


export async function inserirImagem(caminho, id) {

    let comando = `
    update tb_carro
          set img_carro = ?
          where id_carro = ?
          `
    let resposta = await con.query(comando, [caminho, id])
    let info = resposta[0]
    return info.affectedRows
}

export async function inserirCarroEimagem(carro, caminho) {

    let comando = `
      INSERT INTO tb_carro (ds_marca, ds_modelo, nr_ano, vl_preco,  dt_inclusao, img_carro)
        VALUES (?, ?, ?, ?, ?, ?); 
      `
    let resposta = await con.query(comando, [
        carro.marca,
        carro.modelo,
        carro.ano,
        carro.preco,
        carro.inclusao,
        caminho
    ])
    let info = resposta[0];
    let id = info.insertId;
    return id;
}
export async function deletarImagem(id) {
    let comando = `
      update tb_carro
        set img_carro = null
        where id_carro = ?
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0];
    let affectd = info.affectedRows;
    return affectd;
}
