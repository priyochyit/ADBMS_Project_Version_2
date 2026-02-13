🏦 Chittagong Bank PLC | ADMS Project (Frontend V2)

"Enterprise-Grade Banking Database Management System"

📌 Executive Summary:

ADMS Project V2 is a high-fidelity banking management solution designed to handle secure financial operations and multi-tier user hierarchies. Built with a focus on the ACID properties of DBMS, this system ensures data integrity while providing a seamless, modern UI for administrators and end-users.

🏗 System Architecture:

The application follows the Model-View-Controller (MVC) pattern:

Backend: Python/Flask logic managing session states and secure routing.

Frontend: Responsive Jinja2 templates styled with Tailwind CSS for a premium "Glassmorphism" feel.

Data Layer: PostgreSQL (via Neon) utilizing SQLAlchemy for object-relational mapping and complex queries.

⚡ Core Functionalities (CRUD & Beyond):

🟢 Administrative Control (The Master Panel)

Dynamic Data Grid: Real-time visualization of the entire user registry.

Account Governance: Ability to Create, Edit, and Terminate user records via secure modals.

Treasury Management: A specialized logic to disburse salaries from the admin treasury to staff accounts with balance validation.

🔵 User & Staff Experience:

Role-Based Access Control (RBAC): Distinct dashboards for Admins, Staff, and Users.

Secure Ledger: Users can track their balance and transaction placeholders in a high-end interface.

🔐 Security & Validation:

Bcrypt Encryption: Industry-standard password hashing.

Integrity Checks: Server-side validation to prevent negative balance transfers and empty field submissions.

🛠 Tech Stack & Tools
Logic: Python 3.x, Flask

Database: PostgreSQL, SQLAlchemy (ORM)

Security: Flask-Login, Bcrypt

UI/UX: Tailwind CSS, JavaScript (ES6+), Font-Awesome

📥 Quick Start:

Clone & Install:

git clone https://github.com/priyochyit/ADBMS_Project_Version_2.git

pip install -r requirements.txt

Environment Setup: Update SQLALCHEMY_DATABASE_URI in app.py.

Execute:
python app.py
