import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='sidebar sidebar-dark pt-2'>
      <ul class='list-unstyled'>
        <li>
          <Link href="/" class='sidebar-item'>
            <i class='fas fa-home'></i>Dashboard
          </Link>
        </li>
        <li>
          <a href="#donor" class='sidebar-item'>
            <i class='fas fa-hospital-symbol'></i>Donor
          </a>
        </li>
        <li>
          <a href="#receiver" class='sidebar-item'>
            <i class='fas fa-user-injured'></i>Reciever
          </a>
        </li>

        {/* <li>
          <a href='#sm_expand' data-toggle='collapse' class='sidebar-item'>
            <i class='fa fa-users'></i>Employees
          </a>
          <ul id='sm_expand' class='list-unstyled collapse'>
            <li>
              <a
                href="{% url 'employees:create' %}"
                class='sidebar-dropdown-item'
              >
                Add{' '}
              </a>
            </li>

            <li>
              <a
                href="{% url 'employees:list' %}"
                class='sidebar-dropdown-item'
              >
                Doctor{' '}
              </a>
            </li>

            <li>
              <a
                href="{% url 'employees:staff_list' %}"
                class='sidebar-dropdown-item'
              >
                Staff{' '}
              </a>
            </li>
          </ul>
        </li> */}

        <li>
          <a href="#users" class='sidebar-item'>
            <i class='fas fa-user'></i>Users
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
