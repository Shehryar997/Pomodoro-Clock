# 1. How to run

Open the project folder.

You can either:

1. Open `index.html` directly in the browser

or

2. Run it using VS Code Live Server

Steps for Live Server:

Right Click index.html → Open with Live Server

No additional packages or dependencies are required.


# 2. Stack & design choices

I used vanilla HTML, CSS, and JavaScript because the project requirements are relatively focused and don't necessarily require a frontend framework. Using plain JavaScript keeps the app lightweight, easy to review, and quick to run without any setup or dependencies.

# Design Decision 1

I made the timer the largest visual element on the screen because it is the primary interaction point of the application. Users should be able to glance at the screen and immediately understand how much time is left without distraction.

# Design Decision 2

I separated the timer and session history into two different cards on desktop screens. This creates a clearer visual hierarchy and prevents the interface from feeling crowded while still keeping everything accessible within a single screen.


# 3. Responsive & accessibility

# Responsive Behavior

On larger screens like a 1440px laptop, the layout uses a two-column structure with the timer on the left and the history panel on the right.

On smaller devices like a 360px mobile screen, the layout switches into a single-column view. The timer scales down, buttons wrap properly, and spacing adjusts to keep the interface easy to use on touch devices.

# Accessibility Consideration Implemented

I used strong color contrast and large button sizes to improve readability and usability across different devices. The controls are also spaced in a way that makes them easier to interact with on mobile screens.

### Accessibility Consideration Not Fully Implemented

I did not implement advanced keyboard shortcuts or screen reader announcements for timer state changes. With more time, I would add keyboard controls and ARIA live regions to improve accessibility further.

---

## 4. AI usage

I used ChatGPT during development mainly for brainstorming layout ideas, refining timer logic structure, and improving the responsive CSS organization.

One example where I changed the AI-generated output was the responsive layout. The original suggestion used fixed-width sections, which did not adapt well on smaller screens. I replaced it with a responsive CSS grid layout and added mobile breakpoints so the interface behaves properly across different screen sizes. I also adjusted parts of the timer logic manually to make the focus/break transitions feel smoother and easier to maintain.

# 5. Honest gap

The part that still feels least polished is the overall session completion experience. The timer works correctly, but the transition between states could feel more satisfying visually. With another day, I would improve the animations, add a circular progress indicator, and create better visual feedback when a session finishes to make the app feel more refined and interactive.
