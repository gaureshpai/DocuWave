#!/usr/bin/env python3
import csv



def read_employees(csv_file_location):

    # Register the empDialect

    csv.register_dialect('empDialect', skipinitialspace=True, strict=True)

    

    # Open the CSV file using DictReader and empDialect

    with open(csv_file_location) as file:

        employee_file = csv.DictReader(file, dialect='empDialect')

        

        # Initialize an empty list to store dictionaries

        employee_list = []
            

        # Iterate over the CSV file and append dictionaries to the list

        for data in employee_file:

            employee_list.append(dict(data))

        

    # Return the list of dictionaries

    return employee_list



# Test the function

employee_list = read_employees('employees.csv')


def process_data(employee_list):
  department_list = []
  

  for employee_data in employee_list:

    department_list.append(employee_data['Department'])

  department_data = {}

  for department_name in set(department_list):

    department_data[department_name] = department_list.count(department_name)

  return department_data

dictionary = process_data(employee_list)

print(dictionary)

