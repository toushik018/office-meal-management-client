const Footer = () => {
  return (
    <div className="w-full bg-gray-800 text-white py-4 mt-auto text-center">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm">
          © 2024 Office Meal Management. All rights reserved.
        </p>
        <div className="flex justify-center mt-2 space-x-4">
          <a href="#" className="text-white hover:underline">
            Terms of Use
          </a>
          <a href="#" className="text-white hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-white hover:underline">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
