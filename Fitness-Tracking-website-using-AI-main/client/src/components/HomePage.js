import React from "react";
import '../styles/HomePage.css';

const HomePage = () => {
  const gallery = [
    "/img1.webp",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img7.jpg",
    "/img8.jpg",
    "/img5.jpg",
    "/img6.jpg",
  ];

  // Function to handle button click for "Start Your Journey"
  const handleStartJourney = () => {
    window.location.href = '/dashboard'; // Redirect to dashboard
  };

  // Function to handle button click for "Discover Your Plan"
  const handleDiscoverPlan = () => {
    window.location.href = '/dietPlanner'; // Redirect to plans page
  };

  return (
    <div className="homepage">
      <section className="hero" id="home">
        <div className="content">
          <div className="title">
            <h1>LET'S</h1>
            <h1>GET</h1>
            <h1>MOVING</h1>
          </div>
          <div className="sub-title">
            <p>Your Journey to Fitness Starts Here</p>
            <p>Unleash Your Potential</p>
          </div>
          <div className="buttons">
            <button onClick={handleStartJourney}>Start Your Journey</button>
            <button onClick={handleDiscoverPlan}>Plan Your Diet</button>
          </div>
        </div>
      </section>

      <video autoPlay muted loop className="background-video">
        <source src="/Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Features Section */}
      <section className="features" id="features">
        <h2 className="features-heading">Key Features</h2>
        <blockquote className="features-quote">"Your Fitness Journey, made Smarter and Simpler"</blockquote>
        <div className="features-container">
          <img src="./img5.jpg" alt="Features" className="features-image" />
          <div className="features-cards">
            {[ // Map over features array to generate cards dynamically
              { title: "Track Your Workouts", desc: "Log your exercises, sets, reps, and weight to monitor progress." },
              { title: "Monitor Your Progress", desc: "View your workout history, progress charts, and achievements." },
              { title: "Set Goals and Reminders", desc: "Set fitness goals, reminders, and notifications to stay motivated." },
              { title: "Nutrition Tracking", desc: "Log your meals and track your daily calorie intake and nutritional information." },
              { title: "AI Chatbot", desc: "An intelligent virtual assistant to provides personalized workout tips and answers health and fitness questions." },
              { title: "Customizable Workout Plans", desc: "Create personalized workout plans based on your fitness goals and preferences." },
              { title: "Personal Dashboard", desc: "Create and manage profiles, track fitness journey, and monitor progress." },
              { title: "Graphs and Analytics", desc: "Visual representations of progress over time, including weight loss, muscle gain, or endurance improvements." },
              { title: "Stress Management", desc: "Provide tips and resources for managing stress through fitness and wellness practices." },
              { title: "Wearable Device Integration", desc: "Sync data from wearable devices for seamless tracking." }
            ].map((feature, index) => (
              <div className="card" key={index}>
                <h1>{feature.title}</h1>
                <br />
                <h4>{feature.desc}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery">
        <h1>BETTER BEATS BEST</h1>
        <div className="images">
          <div>
            {gallery.slice(0, 3).map((element, index) => (
              <img key={index} src={element} alt="galleryImage" />
            ))}
          </div>
          <div>
            {gallery.slice(3, 6).map((element, index) => (
              <img key={index} src={element} alt="galleryImage" />
            ))}
          </div>
          <div>
            {gallery.slice(6, 9).map((element, index) => (
              <img key={index} src={element} alt="galleryImage" />
            ))}
          </div>
        </div>
      </section>

      <section className="about-us" id="about-us">
        <h2 className="about-us-title">Our Team</h2>
        <p className="about-us-description">
          At Fit Zura, our mission is to empower individuals to stay consistent in their fitness journey by offering a personalized, interactive experience. Our platform allows users to log and track their fitness activities in real-time, using both manual inputs and our custom-built NLP chatbot. Through engaging, conversational interactions, users can ask questions about their progress and receive instant, insightful responses. With clear data visualizations and personalized feedback, Fit Zura helps users stay motivated and achieve their fitness goals efficiently.
        </p>
        <div className="about-us-cards">
          {/* Team Members */}
          <div className="about-us-card">
            <h3 className="about-us-member-name">Lalit Kumar</h3>
            <p className="about-us-member-work">Frontend Developer</p>
          </div>
          <div className="about-us-card">
            <h3 className="about-us-member-name">Manoj Kumar</h3>
            <p className="about-us-member-work">Backend Developer</p>
          </div>
          <div className="about-us-card">
            <h3 className="about-us-member-name">Kapil kumar jadaun</h3>
            <p className="about-us-member-work">Authentication</p>
          </div>
          <div className="about-us-card">
            <h3 className="about-us-member-name">Pankaj Kumar</h3>
            <p className="about-us-member-work">Database</p>
          </div>
          
        </div>
      </section>

      <footer className="Footer">
        <h2>Connect with us..</h2>
        <p>Follow us on social media for the latest tips and updates!</p>
        <ul className="social-links">
          <li>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f" />
              Facebook
            </a>
          </li>
          <li>
            <a href="https://www.x.com/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-X" />
              X
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in" />
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram" />
              Instagram
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default HomePage;
