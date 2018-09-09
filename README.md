# launchpadlab_challenge

Code for the short LaunchPad Lab challenge. I've created a simple "mvp"-type project to fulfill the requirements of the challenge. With more time and if not for school, I would love to have added more elaborate features.

When starting out, I initially tested out the Github API to see what kind of data I could retrieve to see what kind of charts to display. I began with the mindset of charting out differences to give better visual differences of the frameworks. But I noticed the Github API didn't give out all the data one might want, such as total commit count vs commits in the last week.

Another hurdle I ran into was throttling from non authenticated requests. That's not too big of an issue, I simply used Basic Authentication in the HTTP requests to increase my limits. After I finished, I realized there were probably better ways of doing this in the code rather than hardcoding it :D.

The refresh of the page wasn't too difficult, in my previous internship I've used the setInterval function to rerender components, so this was a natural solution.

## If I had more time/Future deliverables

I would improve the following:

- Add better visuals, perhaps spend more time studying the Github API to see what I can chart
- Add a refresh interval dropdown, to allow the user to modify the refresh rate
- Splitting of data, tabbed cards to differentiate the data
- Use of redux. Although not an issue currently, proper state management helps faciliate clean code and easier scalability
