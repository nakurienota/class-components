import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div className="about">
      <h1>About page</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad blanditiis culpa cum debitis dignissimos dolorem ducimus eos et facere inventore laborum minima modi nihil odio, pariatur perferendis quis repudiandae temporibus vel voluptatum! Ad amet aspernatur consequuntur dicta doloribus, eum expedita ipsa ipsam, molestiae nostrum provident voluptate! Aperiam beatae cupiditate dolore dolorem doloribus dolorum eveniet exercitationem fuga id inventore iste perferendis possimus, provident quaerat quasi sint suscipit ut. Accusamus beatae eos expedita impedit iste natus pariatur perspiciatis tempore ut. Ab ad aut beatae cum cupiditate distinctio enim explicabo facilis harum hic id libero magnam maiores nulla numquam sapiente, totam unde voluptatum.</p>
      <Link to="/">Home</Link>
    </div>
  );
}

export default AboutPage;