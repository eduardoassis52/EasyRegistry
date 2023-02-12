const pro_recentes = document.getElementById("recentes");




propriedades.slice(0, 10).forEach(prop => {
    pro_recentes.innerHTML += ` 
        
    <div class="propriedades-lateral">
        <p>${prop.title}.</p>
        <a href="venda.html">Leia mais</a>
    </div>
    
`;
});

contrato.on("event_changed_status", async (owner) => {
	if (owner == await signer.getAddress()){
		window.alert("Teste do recentes");
	}
})