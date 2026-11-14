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


3. An example of how scoring a round should look like can be found at @screenshot/scorerounds. 
     - A comment can be added to the round. 
     - There should also be a list of comments beneath your add a score form from other users who may have commented on the same round. However, the scorer cannot see the other comments until they have submitted a score. Then the other comments are revealed and the user/scorer can up or down vote other comments and even add comments to other comments. Once a score is submitted there is a "Next Round" button for the user to proceed.
     - Each round that you have scored you have the option to view other comments and scores for that round.

     ## Implementation