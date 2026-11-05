# Landing Page
## Goals
Please create the homepage. References:
     @screenshots/landing-0.png (top)
     @screenshots/landing-1.png (middle)
     @screenshots/landing-2.png (bottom)


# Create Scorecard Workflow
## Goals
- The user clicks option to create a new scorecard. There should be an autocomplete feature when entering the names of the fighters if they already exist in DB. 
- If both fighters have a fight together already, the user will be prompted to select which fight if there are several. Such as, weightclass or meeting number.
- If the fight does not exist in our DB, the user will be notified and will be taken to a form where the necessary information to create the fight can be entered.
- The required information for a fight are two fighters, the total number of rounds, the weight class, the meeting number.
  - If a fighter cannot be found in our DB, there is a form for the fighter's information:
     First name, last name, suffix?
- Once the needed infomation is entered for the fight, it will be created and saved then the user will be taken to the first round of the fight to score.

# ASP.NET Database/Backend
## Goals
Create an ASP.NET API project as the backend. I would like to use Entity Framework migrations. This new project should exist as a sibling to the majority-decision-frontend.
