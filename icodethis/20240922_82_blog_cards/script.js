const blogList = document.querySelector("#card-list");
const templateBlogCard = document.querySelector("#tpl-blog-card");
const readmoreBtns = document.getElementsByClassName("read-more-hero-text");
const minimizeBtns = document.getElementsByClassName("minimize");
const blogTitles = document.getElementsByClassName("content-title");

loadBlogData();

for (var i = 0; i < minimizeBtns.length; i++) {
    minimizeBtns[i].addEventListener("click", (event) => { minimize(event.target); })
}

for (var i = 0; i < readmoreBtns.length; i++) {
    readmoreBtns[i].addEventListener("click", (event) => { readmore_prepExpandBlog(event); })
}

for (var i = 0; i < blogTitles.length; i++) {
    blogTitles[i].addEventListener("click", (event) => { title_prepExpandBlog(event); })
}

function readmore_prepExpandBlog(event) {
    var readmoreBtn = event.target;
    var blogSummary = readmoreBtn.parentNode.parentNode.parentNode.querySelector(".card-summary");
    var minimizeBtn = event.target.parentNode.parentNode.parentNode.querySelector(".minimize");
    expandBlog(event, readmoreBtn, blogSummary, minimizeBtn);
}

function title_prepExpandBlog(event) {
    var blogSummary = event.target.parentNode.parentNode.parentNode.querySelector(".card-summary");
    var readMoreBtn = event.target;
    var minimizeBtn = event.target.parentNode.parentNode.querySelector(".minimize");
    expandBlog(event, readMoreBtn, blogSummary, minimizeBtn);
    cosnole.log(blogSummary.innerHTML);
}

function expandBlog(event, readmoreBtn, blogSummary, minimizeBtn) {
    // var readmoreBtn = event.target;
    // var blogSummary = readmoreBtn.parentNode.parentNode.parentNode.querySelector(".card-summary");
    // var minimizeBtn = event.target.parentNode.parentNode.parentNode.querySelector(".minimize");
    if (blogSummary.classList.contains("hide")) {
        applyClassAll(blogSummary, "hide", "remove");
        applyClassAll(minimizeBtn, "hide", "remove");
    } else {
        applyClassAll(blogSummary, "hide", "add");
        applyClassAll(minimizeBtn, "hide", "add");
    }
    blogSummary.parentNode.parentNode.classList.toggle("expanded");
    var blogText = readmoreBtn.parentNode.querySelector(".blog-text");
    blogText.classList.toggle("height50");
    if (readmoreBtn.textContent == "... Read More") {
        readmoreBtn.textContent = "Read Less";
    } else {
        readmoreBtn.textContent = "... Read More";
    }
}

function loadBlogData() {
    var allBlogData = getBlogText();
    for (var i = 0; i < allBlogData.length; i++) {

        var blogData = allBlogData[i];
        var newCard = templateBlogCard.content.cloneNode(true);
        var cardItem = newCard.querySelector(".card");
        cardItem.querySelector("img").src = blogData.blogImg;
        var cardDetails = cardItem.querySelector(".card-content > .card-details");
        cardDetails.querySelector(".blog-text").innerHTML = blogData.text;
        cardDetails.querySelector("h2").innerHTML = blogData.title;
        var authorInfo = cardDetails.querySelector(".footer > .author-info");
        console.log(authorInfo.innerHTML);
        authorInfo.querySelector(".author-img").src = blogData.authorImg;
        authorInfo.querySelector(".author-name").innerHTML = blogData.authorName;
        authorInfo.querySelector(".author-title").innerHTML = blogData.authorTitle;
        cardDetails.querySelector(".footer > .date").innerHTML = blogData.date;

        var cardSummary = cardItem.querySelector(".card-summary");
        cardSummary.querySelector(".blog-title").innerHTML = blogData.title;
        var cardSummaryAuthorInfo = cardSummary.querySelector(".footer > .author-info");
        cardSummaryAuthorInfo.querySelector(".author-img").src = blogData.authorImg;
        cardSummaryAuthorInfo.querySelector(".author-name").innerHTML = blogData.authorName;
        cardSummaryAuthorInfo.querySelector(".author-title").innerHTML = blogData.authorTitle;

        if (blogData.tag != "") {
            cardItem.classList.add(blogData.tag);
            // cardItem.classList.add("expanded") and ;
        }

        blogList.appendChild(newCard);

    }
}

function minimize(elem) {
    console.log("minimize!!");
    var exitBtn = elem;
    elem.classList.add("hide");
    var blogSummary = exitBtn.parentNode.parentNode.querySelector(".card-summary");
    console.log(blogSummary.innerHTML);
    if (blogSummary.classList.contains("hide")) {
        applyClassAll(blogSummary, "hide", "remove");
        applyClassAll(document.querySelector(".minimize"), "hide", "remove");
    } else {
        applyClassAll(blogSummary, "hide", "add");
        applyClassAll(document.querySelector(".minimize"), "hide", "add");
    }
    blogSummary.parentNode.parentNode.classList.toggle("expanded");
    var blogText = exitBtn.parentNode.parentNode.querySelector(".card-content > .card-details > .blog-text");
    blogText.classList.toggle("height50");
    var readmoreBtn = exitBtn.parentNode.parentNode.querySelector(".card-content > .card-details > .read-more-hero-text");
    if (readmoreBtn.textContent == "... Read More") {
        readmoreBtn.textContent = "Read Less";
    } else {
        readmoreBtn.textContent = "... Read More";
    }
}

///////////////////////////////////
// utility functions
///////////////////////////////////
function applyClassAll(node, className, addOrRemove) {
    if (addOrRemove == "add") {
        addIfNeeded(node, className);
    } else {
        removeIfNeeded(node, className);
    }
    applyClassAllDescendants(node, className, addOrRemove);
}

function applyClassAllDescendants(node, className, addOrRemove) {
    node.childNodes.forEach(child => {
        applyClassAllDescendants(child, className, addOrRemove);
        if (child.id !== undefined) {
            if (addOrRemove == "add") {
                addIfNeeded(child, className);
            } else {
                removeIfNeeded(child, className);
            }
        }
    });
}
// TODO: Make recursive!
function findParentClass(elem, className) {
    var foundItem = undefined;
    if (elem.classList.contains(className)) {
        foundItem = elem;
    } else if (elem.parentNode.classList.contains(className)) {
        foundItem = elem.parentNode;
    } else if (elem.parentNode.parentNode.classList.contains(className)) {
        foundItem = elem.parentNode.parentNode;
    } else if (elem.parentNode.parentNode.parentNode.classList.contains(className)) {
        foundItem = elem.parentNode.parentNode.parentNode;
    }
    return foundItem;
}

function addIfNeeded(elem, className) {
    if (!elem.classList.contains(className)) {
        elem.classList.add(className);
    }
}

function removeIfNeeded(elem, className) {
    if (elem.classList.contains(className)) {
        elem.classList.remove(className);
    }
}


function getBlogText() {
    return [
        {
            title: "How To Build Trust At Work",
            blogImg: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
            tag: "",
            authorName: "Nina Ford",
            authorImg: "https://images.unsplash.com/photo-1589525231707-f2de2428f59c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            authorTitle: "Manager",
            date: "8 Apr",
            text: `Trust is the cornerstone of any thriving workplace,
                    fostering collaboration, productivity, and employee well- being.Just like a
                    well - constructed website, building trust at work requires a solid framework
                    and some interactive elements.Here are some actionable steps to cultivate
                    trust and create a harmonious work environment:
                 <ol>
                    <li><strong>Communicate Transparently:</strong> Embrace openness and clear
                        communication. Like
                        well-commented code, transparent communication fosters understanding,
                        leaving no
                        room for misinterpretations.</li>

                    <li><strong>Deliver on Promises:</strong> Trust is built on reliability, just
                        like a website's uptime.
                        Keep your commitments, and colleagues will know they can depend on you.</li>

                    <li><strong>Show Empathy:</strong> Support your team, and it'll be a lot like
                        debugging; you'll find and
                        resolve issues together. Empathy creates bonds that fuel collaboration.</li>

                    <li><strong>Embrace Feedback:</strong> Just like constant updates keep software
                        running smoothly,
                        accepting constructive criticism fuels personal growth and strengthens
                        trust.</li>

                    <li><strong>Share Successes:</strong> Celebrate team wins, and it'll be like a
                        victory dance party!
                        Recognize and appreciate each other's achievements.</li>

                    <li><strong>Be Approachable:</strong> Like a user-friendly interface, being
                        approachable invites open
                        communication and encourages teamwork.</li>

                    <li><strong>Respect Boundaries:</strong> Respecting each other's space is like
                        maintaining good code
                        separation. Honor personal boundaries to build a sense of safety and trust.
                    </li>
                </ol>

                 Remember, building trust is like crafting an engaging user experience; it's an
                 ongoing process.Keep nurturing your professional relationships, and watch your
                 workplace thrive!
                <br> <br>
                In the wise words of Michael Scott from "The Office," "Would I rather be
                feared or loved? Easy. Both. I want people to be afraid of how much they love working
                with me." With trust, you can achieve both fear and love (in the best way possible). 
                So, let's get building, team!`
        },
        {
            title: "How Do You Get Up And Go Forward",
            blogImg: "https://plus.unsplash.com/premium_photo-1673458333585-230b0c50e49b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
            tag: "new-tag",
            authorName: "Lura Reeves",
            authorImg: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            authorTitle: "Manager",
            date: "8 Apr",
            text: `Life is a roller coaster, and sometimes, it feels like
                    we're stuck in a loop-de-loop. But fear not, because just like a skilled
                    developer tackling a complex bug, you have the power to move forward and conquer 
                    any challenge that comes your way. Here's how to rise strong and make progress on your
                    journey:

                    <ol>
                        <li><strong>Embrace Introspection:</strong> Take a moment to reflect on your
                            past
                            experiences, just like a debugger helps identify errors. Acknowledge
                            your
                            strengths and areas for growth, laying the foundation for positive
                            change.
                        </li>
                        <li><strong>Set Clear Goals:</strong> Like setting milestones in a project,
                            define
                            achievable goals for yourself. They will act as a roadmap to guide you
                            towards
                            success.</li>
                        <li><strong>Stay Positive:</strong> Approach setbacks like a seasoned coder,
                            viewing
                            them as learning opportunities. Cultivate a growth mindset, and you'll
                            find
                            the
                            courage to keep moving forward.</li>
                        <li><strong>Surround Yourself with Support:</strong> Like a reliable
                            development
                            community, build a network of friends, mentors, and colleagues who lift
                            you
                            up
                            and encourage your progress.</li>
                        <li><strong>Take One Step at a Time:</strong> Just as coding requires a
                            step-by-step
                            approach, break your challenges into manageable tasks. Celebrate each
                            small
                            victory on your path to greater achievements.</li>
                        <li><strong>Embrace Change:</strong> Emulate a software update, adapting to
                            new
                            situations and embracing change. Remember that growth often comes from
                            stepping
                            outside your comfort zone.</li>
                        <li><strong>Prioritize Self-Care:</strong> Like maintaining your physical
                            health,
                            take care of your mental well-being. Rest, recharge, and practice
                            mindfulness to
                            keep your motivation intact.</li>
                        <li><strong>Celebrate Your Wins:</strong> Celebrate your accomplishments
                            with
                            enthusiasm, just like a successful deployment. Reward yourself for
                            progress
                            made, no matter how big or small.</li>
                    </ol>

                    <br>Remember, getting up and moving forward is a lot like pushing code - it may
                    be challenging, but the satisfaction of seeing your progress is incomparable. Keep
                    pushing
                    through, and soon you'll look back and realize how far you've come.</p>
                    <br>
                    <blockquote>
                        <span>In the immortal words of Walt Disney, "We keep moving forward, opening
                            new doors, and doing new things, because we're curious, and curiosity 
                            keeps leading us down new paths."</span>
                    </blockquote>

                    <br>Embrace your curiosity, take those steps forward, and watch as your journey
                    unfolds in exciting ways.</p>

                    <br>So, my fellow adventurer, lace up those metaphorical boots, keep your eyes
                    on the horizon, and march bravely forward. You've got this! 🚀</p>`
        },
        {
            title: "Accomplish Great Things in Life",
            blogImg: "https://images.unsplash.com/photo-1543357480-c60d40007a3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
            tag: "",
            authorName: "Ola Mann",
            authorImg: "https://images.unsplash.com/photo-1556557286-bf3be5fd9d06?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            authorTitle: "Manager",
            date: "8 Apr",
            text: `<p>In the vast canvas of life, greatness comes in diverse forms, shaped by our unique
                    passions and aspirations. To accomplish great things, start with a solid foundation
                    - nourish your physical, mental, and emotional well-being.</p><br>
                <p>Allow yourself to dream without limitations; envision the life you desire, just like
                    a visionary architect designs a masterpiece. Embrace inclusivity and remember that
                    greatness is subjective; it can be found in acts of kindness, artistic creations, or
                    groundbreaking innovations.</p><br>
                <p>Take intentional steps toward your dreams, driven by a sense of purpose and
                    resilience. Every setback is an opportunity to learn and grow, just like a skilled
                    coder debugs their program.</p><br>
                <p>Surround yourself with a supportive community, just as a thriving ecosystem fosters
                    growth. Together, we empower each other to soar.</p><br>
                <p>Remember, greatness lies within all of us, waiting to be unleashed. So, let your
                    heart guide you, and with courage and determination, embark on a journey to
                    accomplish the extraordinary.</p>
                <blockquote><br>
                    <p>"The only limit to our realization of tomorrow will be our doubts of today." -
                        Franklin D. Roosevelt</p>
                </blockquote><br>
                <p>Believe in yourself, embrace your uniqueness, and dare to achieve the extraordinary.
                    Together, let's celebrate each other's greatness and make a positive impact on the
                    world.</p><br>
                <p>Dream big, aim high, and let your greatness shine brightly!</p>
`
        }
    ]
}