import subprocess

print('SAAS Team 24 project')
print('WARNING: Comunication through Kafka may be problematic due to cloud services running on it too')

#input init
print("Initialize input_actuall_total_load Image")
process = subprocess.run('docker build ./input_actuall_total_load -t local/input_actuall_total_load', shell=True);
print('Run input_actuall_total_load Image')
process = subprocess.run('docker run -p 9001:8080 -d local/input_actuall_total_load', shell=True);


print("Initialize input_aggr_generation_per_type Image")
process = subprocess.run('docker build ./input_aggr_generation_per_type -t local/input_aggr_generation_per_type', shell=True);
print('Run input_aggr_generation_per_type Image')
process = subprocess.run('docker run -p 9002:8080 -d local/input_aggr_generation_per_type', shell=True);


print("Initialize input_physical_flows Image")
process = subprocess.run('docker build ./input_physical_flows -t local/input_physical_flows', shell=True);
print('Run input_physical_flows Image')
process = subprocess.run('docker run -p 9003:8080 -d local/input_physical_flows', shell=True);


#modify init
print("Initialize modify_actuall_total_load Image")
process = subprocess.run('docker build ./modify_actuall_total_load -t local/modify_actuall_total_load', shell=True);
print('Run modify_actuall_total_load Image')
process = subprocess.run('docker run -p 9004:8080 -d local/modify_actuall_total_load', shell=True);


print("Initialize modify_aggr_generation_per_type Image")
process = subprocess.run('docker build ./modify_aggr_generation_per_type -t local/modify_aggr_generation_per_type', shell=True);
print('Run modify_aggr_generation_per_type Image')
process = subprocess.run('docker run -p 9005:8080 -d local/modify_aggr_generation_per_type', shell=True);


print("Initialize modify_physical_flows Image")
process = subprocess.run('docker build ./modify_physical_flows -t local/modify_physical_flows', shell=True);
print('Run modify_physical_flows Image')
process = subprocess.run('docker run -p 9006:8080 -d local/modify_physical_flows', shell=True);

#fetch init

print("Installation done (for now)")