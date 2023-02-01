<h2>Motivation</h2>
Given website like <a href='https://www.checkyourtechskills.com'>www.checkyourtechskills.com</a> you have there many quiz results and many contact us entries. So fetch every thing to view might take too long.Also you might not want to see every thing maybe you want to see latest info. so what to do ? the answer is pagination

<h2>Introduction</h2>
This problem is interesting when all info is on the client and you want to go over part of it. But in general you do not put all info on the client and you fetch info from the server per page. This pagination is both server and client issue.

<h2>Setup</h2>
www.checkyourtechskills.com is a next.js application with mongodb as data base. so i will start with next.js but to make it simple the server will store the data on json file or fetch from jsonplaceholder

<h2>Data fetching strategy</h2>
<ul>
<li>A simple strategy with CSR</li>
<li>A strategy for ssg\ssr\isr</li>
</ul>
