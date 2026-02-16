from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import random
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'chittagong_bank_secure_key'

# --- DATABASE CONFIGURATION ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://neondb_owner:npg_fOwU1GYX6dZL@ep-super-dew-a1uy5yfn-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login_page'

# --- DATABASE MODELS ---
class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user') # 'user', 'staff', 'admin'
    account_no = db.Column(db.String(20), unique=True)
    balance = db.Column(db.Float, default=5000.0)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# --- ROUTES ---

@app.route('/')
def home():
    if current_user.is_authenticated:
        if current_user.role == 'admin': return redirect(url_for('admin_dashboard'))
        elif current_user.role == 'staff': return redirect(url_for('employee_dashboard'))
        return redirect(url_for('user_dashboard'))
    return render_template('home.html')

@app.route('/login-page')
def login_page():
    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
        
    email = request.form.get('email')
    password = request.form.get('password')
    selected_role = request.form.get('role')
    
    user = User.query.filter_by(email=email).first()
    
    if user and bcrypt.check_password_hash(user.password, password):
        if user.role != selected_role:
            flash(f'Access Denied! You are registered as "{user.role}", not "{selected_role}".', 'error')
            return redirect(url_for('login_page'))
            
        login_user(user)
        flash(f'Welcome back, {user.name}!', 'success')
        
        if user.role == 'admin':
            return redirect(url_for('admin_dashboard'))
        elif user.role == 'staff':
            return redirect(url_for('employee_dashboard'))
        else:
            return redirect(url_for('user_dashboard'))
    else:
        flash('Invalid email or password.', 'error')
        return redirect(url_for('login_page'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        role = request.form.get('role', 'user')
        
        account_no = f"CBL-{random.randint(100000,999999)}"
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        
        new_user = User(name=name, email=email, password=hashed_password, role=role, account_no=account_no)
        
        try:
            db.session.add(new_user)
            db.session.commit()
            flash('Registration successful! Please login.', 'success')
            return redirect(url_for('login_page'))
        except:
            db.session.rollback()
            flash('Error: Email already exists.', 'error')
    return render_template('register.html')

# --- DASHBOARD ROUTES ---

@app.route('/dashboard/user')
@login_required
def user_dashboard():
    if current_user.role != 'user': return redirect(url_for('home'))
    return render_template('user.html', user=current_user)

@app.route('/dashboard/employee')
@login_required
def employee_dashboard():
    if current_user.role != 'staff': return redirect(url_for('home'))
    current_time = datetime.now().strftime("%d %b %Y | %I:%M %p")
    return render_template('employee.html', user=current_user, current_time=current_time)

@app.route('/dashboard/admin')
@login_required
def admin_dashboard():
    if current_user.role != 'admin': return redirect(url_for('home'))
    all_users = User.query.all()
    return render_template('admin.html', user=current_user, users=all_users)

# --- ADMIN ACTIONS ---

@app.route('/admin/edit_user/<int:user_id>', methods=['POST'])
@login_required
def edit_user(user_id):
    if current_user.role != 'admin': return redirect(url_for('home'))
    
    user = User.query.get_or_404(user_id)
    user.name = request.form.get('name')
    user.email = request.form.get('email')
    user.role = request.form.get('role')
    user.balance = float(request.form.get('balance'))
    
    try:
        db.session.commit()
        flash(f'User {user.name} updated successfully!', 'success')
    except:
        db.session.rollback()
        flash('Error updating user.', 'error')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/delete_user/<int:user_id>', methods=['POST'])
@login_required
def delete_user(user_id):
    if current_user.role != 'admin': return redirect(url_for('home'))
    
    user = User.query.get_or_404(user_id)
    if user.id == current_user.id:
        flash("You cannot delete your own admin account!", "error")
    else:
        db.session.delete(user)
        db.session.commit()
        flash('User deleted successfully!', 'success')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/pay_salary/<int:user_id>', methods=['POST'])
@login_required
def pay_salary(user_id):
    if current_user.role != 'admin': return redirect(url_for('home'))
    
    staff_user = User.query.get_or_404(user_id)
    salary_amount = float(request.form.get('salary_amount', 0))
    
    if salary_amount <= 0:
        flash("Invalid salary amount.", "error")
    elif current_user.balance < salary_amount:
        flash("Insufficient Admin balance to pay salary.", "error")
    else:
        try:
            current_user.balance -= salary_amount
            staff_user.balance += salary_amount
            db.session.commit()
            flash(f"Salary of ৳{salary_amount:,.2f} paid to {staff_user.name} successfully!", "success")
        except:
            db.session.rollback()
            flash("Error processing salary payment.", "error")
            
    return redirect(url_for('admin_dashboard'))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Successfully logged out.', 'info')
    return redirect(url_for('home'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)