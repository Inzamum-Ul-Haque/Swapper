import React from "react";

const Blog = () => {
  return (
    <div className="text-left text-secondary mt-10">
      <h2 className="font-bold text-5xl">Blog</h2>
      <div className="border border-secondary rounded-xl p-5 mt-8 shadow-2xl">
        <h2 className="text-3xl">
          What are the different ways to manage a state in a React application?
        </h2>
        <p>
          There are four main types of state you need to properly manage in your
          React apps:
          <li>Local state</li>
          <li>Global state</li>
          <li>Server state</li>
          <li>URL state</li>
          Local state is most often managed in React using the useState hook.
          <br />
          <br />
          Global state is data we manage across multiple components. Global
          state is necessary when we want to get and update data anywhere in our
          app, or in multiple components at least.
          <br />
          <br />
          Data that comes from an external server that must be integrated with
          our UI state. Server state is a simple concept, but can be hard to
          manage alongside all of our local and global UI state. There are
          several pieces of state that must be managed every time you fetch or
          update data from an external server, including loading and error
          state.
          <br />
          <br />
          Data that exists on our URLs, including the pathname and query
          parameters. URL state is often missing as a category of state, but it
          is an important one. In many cases, a lot of major parts of our
          application rely upon accessing URL state. Try to imagine building a
          blog without being able to fetch a post based off of its slug or id
          that is located in the URL!
        </p>
      </div>
      <div className="border border-secondary rounded-xl p-5 mt-8 shadow-2xl">
        <h2 className="text-3xl">How does prototypical inheritance work?</h2>
        <p>
          In programming, we often want to take something and extend it. For
          instance, we have a user object with its properties and methods, and
          want to make admin and guest as slightly modified variants of it. We'd
          like to reuse what we have in user, not copy/reimplement its methods,
          just build a new object on top of it. Prototypal inheritance is a
          language feature that helps in that.
          <br />
          <br />
          In JavaScript, objects have a special hidden property [[Prototype]]
          (as named in the specification), that is either null or references
          another object. That object is called “a prototype”
          <br />
          When we read a property from object, and it’s missing, JavaScript
          automatically takes it from the prototype. In programming, this is
          called “prototypal inheritance”. And soon we’ll study many examples of
          such inheritance, as well as cooler language features built upon it.
        </p>
      </div>
      <div className="border border-secondary rounded-xl p-5 mt-8 shadow-2xl">
        <h2 className="text-3xl">
          What is a unit test? Why should we write unit tests?
        </h2>
        <p>
          In computer programming, unit testing is a software testing method by
          which individual units of source code—sets of one or more computer
          program modules together with associated control data, usage
          procedures, and operating procedures—are tested to determine whether
          they are fit for use.
          <br />
          <br />
          Some advantages of witing unit tests are:
          <li>You can test units or functions of your project in isolation.</li>
          <li>Unit tests act as documentation for your code.</li>
          <li>
            They enable you to catch bugs early in the development process.
          </li>
          <li>
            Automated unit tests help a great deal with regression testing.
          </li>
          <li>
            They detect code smells in your codebase. For example, if you’re
            having a hard time writing unit tests for a piece of code, it might
            be a sign that your function is too complex.
          </li>
          <li>They contribute to higher code quality. </li>
        </p>
      </div>
      <div className="border border-secondary rounded-xl p-5 mt-8 shadow-2xl">
        <h2 className="text-3xl">React vs. Angular vs. Vue?</h2>
        <p>
          There are a lot of differences between Angular , React and Vue. We are
          only highlighting a small part of the differences.
          <br />
          <br />
          Components are integral parts of all three frameworks, no matter if
          we’re talking Vue, React, or Angular. A component generally gets an
          input, and changes behavior based on it. This behavior change
          generally manifests as a change in the UI of some part of the page.
          The use of components makes it easy to reuse code. A component may be
          a cart on an e-commerce site or a login box on a social network.
          <br />
          <br />
          <span className="font-bold">Angular: </span>In Angular, components are
          referred to as directives. Directives are just markers on DOM
          elements, which Angular can track and attach specific behavior too.
          Therefore, Angular separates the UI part of components as attributes
          of HTML tags, and their behaviors in the form of JavaScript code. This
          is what sets it apart when looking at Angular vs React.
          <br />
          <br />
          <span className="font-bold">React: </span>React, interestingly,
          combines the UI and behavior of components. For instance, here is the
          code to create a hello world component in React. In React, the same
          part of the code is responsible for creating a UI element and
          dictating its behavior.
          <br />
          <br />
          <span className="font-bold">Vue: </span>When looking into Vue vs
          React, in Vue, UI and behavior are also a part of components, which
          makes things more intuitive. Also, Vue is highly customizable, which
          allows you to combine the UI and behavior of components from within a
          script. Further, you can also use pre-processors in Vue rather than
          CSS, which is a great functionality. Vue is great when it comes to
          integration with other libraries, like Bootstrap.
        </p>
      </div>
    </div>
  );
};

export default Blog;
