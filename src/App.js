// Contains all routes and contexts

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {UserProvider} from './context/user.context'
import {ArticleProvider} from './context/article.context'
import {QuestionProvider} from './context/question.context'
import { TutorialProvider } from './context/tutorial.context';
import HomePage from './routes/home-page'
import LoginPage from './routes/login'
import NewPostPage from './routes/new-post-page';
import CreateAccount from './routes/create-account';
import FullArticle from './routes/full-article';
import FullQuestion from './routes/full-question';
import FullTutorial from './routes/full-tutorial';
import ResetPassword from './routes/forget-password';
import Mfa from './routes/2FA'
import AllArticles from './routes/all-articles'
import AllQuestions from './routes/all-questions'
import AllTutorials from './routes/all-tutorials'
import PostTutorial from './routes/post-tutorial'
import FAQs from './routes/FAQs';
import Help from './routes/help';
import Contact from './routes/contact';
import Privacy from './routes/privacy';
import Disclaimer from './routes/disclaimer';
import SafetyAndSecurity from './routes/safety-and-security';
import SubscriptionPlans from './routes/subscriptionPlans'
import StripeContiner from './routes/StripeContainer';
import './css/App.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <ArticleProvider>
          <TutorialProvider>
            <QuestionProvider>
              <div>
                <Routes>
                  <Route path='/' element={<LoginPage />} />
                  <Route path="/home-page" element={<HomePage />} />
                  <Route path='/create-account' element={<CreateAccount />} />
                  <Route path='/post' element={<NewPostPage />} />
                  <Route path='/plans' element={<SubscriptionPlans />} />
                  <Route path="/full-article/:id/:title" element={<FullArticle />} />
                  <Route path="/full-question/:id/:title" element={<FullQuestion />} />
                  <Route path="/full-tutorial/:id/:title" element={<FullTutorial />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/user-2FA" element={<Mfa />} />
                  <Route path='/all-articles' element={<AllArticles />} />
                  <Route path='/all-questions' element={<AllQuestions />} />
                  <Route path='/all-tutorials' element={<AllTutorials />} />
                  <Route path='/post-tutorial' element={<PostTutorial />} />
                  <Route path='/frequently-asked-questions' element={<FAQs />} />
                  <Route path='/help' element={<Help />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/privacy' element={<Privacy />} />
                  <Route path='/disclaimer' element={<Disclaimer />} />
                  <Route path='/safety-and-security' element={<SafetyAndSecurity />} />
                  <Route path='/payment' element={<StripeContiner />} />
                </Routes>
              </div>
            </QuestionProvider>
          </TutorialProvider>
        </ArticleProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
