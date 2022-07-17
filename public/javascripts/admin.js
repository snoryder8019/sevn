function adminLoader(){
    window.addEventListener('click', function(){
        const t = window.event.target;
        const el =this.document.getElementById(t.id);
        el.style.display="none";
        const elSibling = this.document.getElementById(el.nextElementSibling.childNodes[0].id);
     //  const elSibling = this.document.getElementById(el.parentElement.lastElementChild.id);
//console.log(elSibling)
elSibling.style.display="block"
    })
console.log(document.body.hasChildNodes)
}