let but = document.querySelector('.add-btn')
console.log(but)
let task1 = document.querySelector('.task-here')
let inp = document.querySelector('.input')
let con = document.querySelector('.container')

but.addEventListener('click', () => {
    if (inp.value == '') {
        alert('add something')
    }

    else {
        con.append(task1)
        let list = document.createElement('li')
        task1.append(list);


        let tas = document.createElement('div');
        tas.className = 'tasks';

        list.append(tas)

        let image = document.createElement('img')
        image.className = 'uncheck-img';
        image.src = 'unchecked.png'
        let inpu = document.createElement('input')
        inpu.className = 'value-here';


        tas.append(image)
        tas.append(inpu)
        inpu.value = inp.value
        inpu.setAttribute('readonly', '')



        let right = document.createElement('div');
        right.className = 'buttons'
        list.append(right)

        let edi = document.createElement('button')
        edi.className = 'edit-btn'
        edi.innerText = 'Edit'

        let del = document.createElement('button')
        del.className = 'delete-btn'
        del.innerText = 'Delete'


        right.append(edi)
        right.append(del)



        let flag =0;


        image.addEventListener('click',()=>{
            if (flag ==0){
        image.src = 'unchecked.png'
        flag =1;
            }else if(flag==1){
                image.src ='checked.png'
                flag =0;
            }
        })
      

let sav = document.createElement('button')

        let check =0;


        edi.addEventListener('click',()=>{
            if (check ==0){
                edi.innerText = 'Save'
                inpu.removeAttribute('readonly')


        check =1;
            }else if(check==1){
                edi.innerText = 'Edit'
                inpu.setAttribute('readonly','')


                check =0;
                
            }
        })

        
        del.addEventListener('click',()=>{
            list.remove();
        })










            inp.value = ''

    }
})



