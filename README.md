# SOS-Application
# NPM packages
1.Mongoose
2.ejs
3.body-parser
4.node-fetch
5.express
# JobSearch-WIT

Job Search Web Application using Node.js, Express.js, MongoDB and Ejs Templating.

Deployed on https://jobsearch-wit.herokuapp.com/

Demo Video: https://drive.google.com/file/d/1NxvLTbYT00HdyLCwYKD49eX5osmQXXbQ/view?usp=sharing

![Login Page](../master/projectscreenshots/screencapture1.png)


1. Login / Sign page based on two Roles: 
	1. Job Seeker 
	2. Recruiter 

2. Registration page  have the following fields
              	a. user_id
            	b. username
            	c. password
            	d. Email
            	e. Role:
            		(i) Job Seeker
            		(ii) Recruiter       


3. Login is authenticated and the password is hashed before storing in the database. 

4. Home page have following menu options

              a. Search Jobs (visible to all)
	      b. Programs
              c. Your Job Postings (visible to Recruiter role)
              d. Profile

5. Search Jobs page contains a list of all job openings. Each job's details can be viewed on a separate page. User can filter jobs as per requirement using the filter form in sidebar and also use the two buttons on the top to filter 'Jobs for Women' and 'Jobs for poeple who lost jobs during Covid'.

6. Programs Page is devoted to creating awareness regarding upcoming programs for Women in Tech and Post Covid Kickstart. You can view details of each program. 
            
7. Your Job Postings page is only accessible to a recuiter. Your Job Postings menu option displays the jobs which have been posted by the logged-in recruiter. These are accessed via the recruiter_id linked to each job posted.

              a. Delete Job
              b. View Job Details
              c. Add a new job

8. Logout link to redirect user to login page.
