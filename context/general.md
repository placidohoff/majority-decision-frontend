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

# Create Fight
## Goals
Workflow for creating a fight. User clicks create fight, must be logged in first.

# Login/Register
## Goals
User can register and log in. Username and password. 


# Create Scorecard workflow
## Goals
Please create the score a fight workflow. 

1. Two input fields for the names of each fighter. A drop down select that matches the fighters name if they already exist in the DB. User just types it in if the name does not exist. "Fighter A" vs "Fighter B" and a "Next" button.
     - If a fighter does not exist in our DB, then the user must be brought to the Create Fighter Form.
          - Form fields for first name, middle name?, last name, suffix?, picture?

     - Once both fighters are indeed in the DB, our backend can make the fight and add that to our DB. User must input how many rounds the fight has.
     

2. If that fight matchup exists in our DB, a UI card is returned for each fight meeting those two have had is returned to the user. ie, Joe v Smith I, Joe v Smith II, etc. User selects which fight they want to create a scorecard for. 
     - If the fight they are looking to score is not there, there should be a "click here" for the Create a Fight form. 
     - If it is a new meeting between the fighers, such as a rematch or rubber match, the user can create this now.


     2A. Create a Fight Form: The fighters names are already preloaded and can't be changed at this point. There is a form field for the meeting number, must be unique as in can't be a previous meeting number. Form field for number of scheduled rounds and that is all that is required for the fight to me made at this time. 
          - Additional information such as venue, judges, referee, official scorecards, etc. can always be added to later.


3. An example of how scoring a round should look like can be found at @screenshot/score-rounds.png 
     - A comment can be added to the round. 
     - There should also be a list of comments beneath your add a score form from other users who may have commented on the same round. However, the scorer cannot see the other comments until they have submitted a score. Then the other comments are revealed and the user/scorer can up or down vote other comments and even add comments to other comments. Once a score is submitted there is a "Next Round" button for the user to proceed.
     - Each round that you have scored you have the option to view other comments and scores for that round.
