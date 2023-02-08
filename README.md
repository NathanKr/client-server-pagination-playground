<h2>Motivation</h2>
Given website like <a href='https://www.checkyourtechskills.com'>www.checkyourtechskills.com</a> you have there many quiz results and many contact us entries. So fetch every thing to view might take too long.Also you might not want to see every thing maybe you want to see latest info. so what to do ? the answer is pagination

<h2>Introduction</h2>
This problem is interesting when all info is on the client and you want to go over part of it. But in general you do not put all info on the client and you fetch info from the server per page. This pagination is both server and client issue.

<h2>Setup</h2>
www.checkyourtechskills.com is a next.js application with mongodb as data base. so i will start with next.js but to make it simple the server will store the data on json file or fetch from jsonplaceholder

<h2>Data fetching strategy</h2>

<h3>PageWithCsrPagination</h3>
<ul>
<li>Here we have page on the server with 100 products and page on the client with 10 products</li>
<li>The client access the server end point /api/products/server-page?server_page_index e.g. /api/products/server-page?0 for the first server page. 100 items are fetched and the client render 10</li>
<li>The user can choose the server page index and use backward \ forward on the client page index</li>
</ul>

<h3>PageWithSsgPagination</h3>
<ul>
<li>we will split the products to 100 products per page on build time , thus SSG - getStaticProps</li>
<li>we will access these pre rendered pages using dynamic routing - getStaticPaths</li>
<li>i am using Pagination from mui which is nice. my two buttons are thus disabled</li>
</ul>

<h3>Open issues</h3>
<ul>
<li>currently i brut force adding background to pagination becuause it is almost not shown in light mode. there must be a better way<li>
</ul>