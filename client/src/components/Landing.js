import React from 'react';

const Landing = () => {
  return (
    <div className='center-align'>
      <h1>Welcome to SurWay!</h1>
      <h3><a href='/auth/google'>Sign in</a> to start</h3>
      <p>SurWay allows you to create mailing surveys and collect feedback from your users</p>
      <p>Currently only awailable answers to survey are 'Yes' and 'No'</p>
    </div>
  )
}
export default Landing;