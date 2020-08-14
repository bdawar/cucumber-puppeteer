Feature: Search LinkedIn on google

	Scenario: Verify result for google search
		Given The browser is open
		When open Google's homepage
		And search for LinkedIn
		Then display the result count