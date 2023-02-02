const title_head=document.createElement("h1");
title_head.setAttribute("id","title");
title_head.innerText="DOM Pagination Task";

const para=document.createElement("p");
para.setAttribute("id","description");
para.innerText="Creation of Pagination using DOM without writing HTML tag.";

const div=document.createElement("div");
div.classList.add("table-responsive","container");

document.body.append(title_head,para,div);

const table=document.createElement("table");
table.setAttribute("id","table");
table.classList.add("table","table-bordered","border-primary","table-sm");
div.append(table);

const table_head=document.createElement("thead");
const table_head_row=document.createElement("tr");
const table_head_row_data_1=document.createElement("th");
table_head_row_data_1.innerHTML="ID";
const table_head_row_data_2=document.createElement("th");
table_head_row_data_2.innerHTML="Name";
const table_head_row_data_3=document.createElement("th");
table_head_row_data_3.innerHTML="Email";
table_head.append(table_head_row)
table_head_row.append(table_head_row_data_1,table_head_row_data_2,table_head_row_data_3);
const table_body=document.createElement("tbody");
table_body.setAttribute("id","table_body")
table.append(table_head,table_body);

const div_buttons=document.createElement("div");
div_buttons.setAttribute("id","buttons");
div_buttons.classList.add("d-flex","justify-content-center");
div.append(div_buttons);


let buttons_array=["First","Previous",1,2,3,4,5,6,7,8,9,10,"Next","Last"];

for(i=0;i<buttons_array.length;i++)
{
const button_Num=document.createElement("button");
button_Num.innerText=buttons_array[i];
button_Num.setAttribute("id",buttons_array[i]);
div_buttons.append(button_Num);
button_Num.addEventListener("click",display_validation);
}

function display_validation(event){
    if(Number.isNaN(Number(event.target.textContent)))
    {
        event.target.textContent==="First"?display_result(1):event.target.textContent==="Last"?display_result(10):"";
        if(event.target.textContent==="Previous")
        {
          let current_page=Number(document.getElementsByTagName("td")[0].innerText);
          display_result(Math.round(current_page/10));
        }
        else if(event.target.textContent==="Next")
        {
            let current_page=Number(document.getElementsByTagName("td")[0].innerText);
            console.log(current_page);
            console.log(Math.round(current_page/10)+1);
            display_result(Math.round(current_page/10)+2);  
        }
    }
    else
    {
        display_result(Number(event.target.textContent))
    }
} 

function display_result(page_value)
{
    var x=document.getElementById("Previous");
    var y=document.getElementById("Next");
if(page_value===1)
{
   x.style.display="none";
   y.style.display="inline";
}
else if(page_value===10)
{
   x.style.display="inline";
   y.style.display="none";
}
else
{
    x.style.display="inline";
    y.style.display="inline";
}

var request=new XMLHttpRequest();
request.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",true);
request.send();
request.onload=function(){
    var data=request.response
    var res=JSON.parse(data);
    let table_row="";start_value=0;
    page_value===1?start_value=0:start_value=(page_value-1)*10;

    for(i=start_value;i<start_value+10;i++)
    {
        table_row +=`<tr>
        <td>${res[i].id}</td>
        <td>${res[i].name}</td>
        <td>${res[i].email}</td>
        </tr>`
    }
    document.getElementById("table_body").innerHTML=table_row;
}
}

display_result(1);
