Challenge Statement 
 
Our platform relies heavily on automation to check the visual pixel-perfection of web content.  
We provide a visual content editor allowing users to build rich content experiences, and enable 
eCommerce transactions.  We would like you to write a small automation program in the 
framework of your choice to accomplish the following task. 
 
1. Open https://friendly-jepsen-665dc7.netlify.app/pages/cnc-test-1.html 
2. Take a screenshot only of the experience viewer, exclude the rest of page (div class for 
the viewer contains "ExperienceViewer") 
3. Save a screenshot of the Viewer as your “Gold Standard”, ie this is how the content 
should look. 
4. Run your automation multiple times, calculate the % visual difference with each run, and 
output the results. 
5. Automate a click to navigate using the right arrow “>” to go to the second Scene 
showing the “Ariane 5” rocket 
6. Automate a click of the Open Product Link 
7. Automate an add to cart action 
1. Validate the data: Item name, item quantity, price are correct, etc. 
8. Automate the entry of billing and delivery details 
1. Validate the data entered is correct 
9. Complete purchase 
1. Intercept payment POST request and validate that that card number and 
purchase details are correct


Please submit all source files and dependencies such that your code can be executed without any need for additional configuration.  
 
Artifacts: 
1. Please include a small readme file that concisely documents what you have created and 
how it works.   
2. Please include documentation on the test cases you have coded for, highlight those that 
you are aware of, but have not coded for.  
3. Please include documentation on the tools you have selected and why.

