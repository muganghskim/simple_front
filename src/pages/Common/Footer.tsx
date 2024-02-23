
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="ml-64 container mx-auto flex justify-between items-center">
        <div>
          <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
          <p className="text-sm">Made with <span className="text-red-500">&hearts;</span> by Your Team</p>
        </div>
        <div>
          <a href="#" className="text-sm mr-4">Privacy Policy</a>
          <a href="#" className="text-sm">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
