import subprocess

print('SAAS Team 24 project')
print('WARNING: Comunication through Kafka may be problematic due to cloud services running on it too')

#input init
print("Initialize input_actuall_total_load Image")
process = subprocess.run('docker build ./input_actuall_total_load -t local/input_actuall_total_load', shell=True);
print('Run input_actuall_total_load Image')
process = subprocess.run('docker run -p 9001:6661 -d local/input_actuall_total_load', shell=True);


print("Initialize input_aggr_generation_per_type Image")
process = subprocess.run('docker build ./input_aggr_generation_per_type -t local/input_aggr_generation_per_type', shell=True);
print('Run input_aggr_generation_per_type Image')
process = subprocess.run('docker run -p 9002:6660 -d local/input_aggr_generation_per_type', shell=True);


print("Initialize input_physical_flows Image")
process = subprocess.run('docker build ./input_physical_flows -t local/input_physical_flows', shell=True);
print('Run input_physical_flows Image')
process = subprocess.run('docker run -p 9003:6662 -d local/input_physical_flows', shell=True);


#modify init
print("Initialize modify_actuall_total_load Image")
process = subprocess.run('docker build ./modify_actuall_total_load -t local/modify_actuall_total_load', shell=True);
print('Run modify_actuall_total_load Image')
process = subprocess.run('docker run -p 9004:7770 -d local/modify_actuall_total_load', shell=True);


print("Initialize modify_aggr_generation_per_type Image")
process = subprocess.run('docker build ./modify_aggr_generation_per_type -t local/modify_aggr_generation_per_type', shell=True);
print('Run modify_aggr_generation_per_type Image')
process = subprocess.run('docker run -p 9005:7772 -d local/modify_aggr_generation_per_type', shell=True);


print("Initialize modify_physical_flows Image")
process = subprocess.run('docker build ./modify_physical_flows -t local/modify_physical_flows', shell=True);
print('Run modify_physical_flows Image')
process = subprocess.run('docker run -p 9006:7774 -d local/modify_physical_flows', shell=True);

#fetch init

print("Initialize data_fetch_actuall_total_load Image")
process = subprocess.run('docker build ./data_fetch_total -t local/data_fetch_total', shell=True);
print('Run data_fetch_actuall_total_load Image')
process = subprocess.run('docker run -p 9004:8084 -d local/data_fetch_total', shell=True);


print("Initialize data_fetch_physical Image")
process = subprocess.run('docker build ./data_fetch_physical -t local/data_fetch_physical', shell=True);
print('Run data_fetch_physical Image')
process = subprocess.run('docker run -p 9005:8083 -d local/data_fetch_physical', shell=True);


print("Initialize data_fetch_aggr Image")
process = subprocess.run('docker build ./data_fetch_aggr -t local/data_fetch_aggr', shell=True);
print('Run data_fetch_aggr Image')
process = subprocess.run('docker run -p 9006:8082 -d local/data_fetch_aggr', shell=True);
print("Installation done (for now)")