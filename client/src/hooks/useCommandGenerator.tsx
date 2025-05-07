import { useState, useEffect } from 'react';

interface ModuleParam {
  [key: string]: boolean;
}

interface AdditionalOptions {
  useKerberos?: boolean;
  debugMode?: boolean;
  verbose?: boolean;
  localAuth?: boolean;
  [key: string]: boolean | undefined;
}

interface SavedCommand {
  name: string;
  protocol: string;
  targetType: string;
  targetValue: string;
  username: string;
  password: string;
  useHash: boolean;
  selectedModule: string;
  moduleParams: ModuleParam;
  additionalOptions: AdditionalOptions;
  command: string;
}

export const useCommandGenerator = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<string>('smb');
  const [targetType, setTargetType] = useState<string>('ip');
  const [targetValue, setTargetValue] = useState<string>('192.168.1.0/24');
  const [username, setUsername] = useState<string>('Administrator');
  const [password, setPassword] = useState<string>('Password123!');
  const [useHash, setUseHash] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [moduleParams, setModuleParams] = useState<ModuleParam>({});
  const [additionalOptions, setAdditionalOptions] = useState<AdditionalOptions>({});
  const [commandPreview, setCommandPreview] = useState<string>('');
  const [savedCommands, setSavedCommands] = useState<SavedCommand[]>(() => {
    const saved = localStorage.getItem('netexec-commands');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedSavedCommand, setSelectedSavedCommand] = useState<string>('');

  // Generate command based on selected options
  useEffect(() => {
    generateCommand();
  }, [
    selectedProtocol,
    targetType,
    targetValue,
    username,
    password,
    useHash,
    selectedModule,
    moduleParams,
    additionalOptions
  ]);

  // Save commands to localStorage
  useEffect(() => {
    localStorage.setItem('netexec-commands', JSON.stringify(savedCommands));
  }, [savedCommands]);

  const generateCommand = () => {
    let cmd = `netexec ${selectedProtocol} ${targetValue}`;

    // Add authentication
    if (username) {
      cmd += ` -u ${username}`;
    }
    
    if (password) {
      if (useHash) {
        cmd += ` -H ${password}`;
      } else {
        cmd += ` -p '${password}'`;
      }
    }

    // Add module
    if (selectedModule) {
      cmd += ` -M ${selectedModule}`;
      
      // Add module parameters
      const params = Object.entries(moduleParams)
        .filter(([_, value]) => value)
        .map(([key]) => key);
      
      if (params.length > 0) {
        cmd += ` -o ${params.join(' ')}`;
      }
    }

    // Add additional options
    if (additionalOptions.useKerberos) {
      cmd += ' --kerberos';
    }
    
    if (additionalOptions.debugMode) {
      cmd += ' --debug';
    }
    
    if (additionalOptions.verbose) {
      cmd += ' --verbose';
    }
    
    if (additionalOptions.localAuth) {
      cmd += ' --local-auth';
    }

    setCommandPreview(cmd);
    return cmd;
  };

  const saveCommand = (name: string) => {
    const command = generateCommand();
    const newSavedCommand: SavedCommand = {
      name,
      protocol: selectedProtocol,
      targetType,
      targetValue,
      username,
      password,
      useHash,
      selectedModule,
      moduleParams,
      additionalOptions,
      command
    };

    setSavedCommands(prev => [...prev, newSavedCommand]);
    setSelectedSavedCommand(name);
  };

  const loadCommand = (name: string) => {
    const command = savedCommands.find(cmd => cmd.name === name);
    if (command) {
      setSelectedProtocol(command.protocol);
      setTargetType(command.targetType);
      setTargetValue(command.targetValue);
      setUsername(command.username);
      setPassword(command.password);
      setUseHash(command.useHash);
      setSelectedModule(command.selectedModule);
      setModuleParams(command.moduleParams);
      setAdditionalOptions(command.additionalOptions);
    }
  };

  return {
    selectedProtocol,
    setSelectedProtocol,
    targetType,
    setTargetType,
    targetValue,
    setTargetValue,
    username,
    setUsername,
    password,
    setPassword,
    useHash,
    setUseHash,
    selectedModule,
    setSelectedModule,
    moduleParams,
    setModuleParams,
    additionalOptions,
    setAdditionalOptions,
    commandPreview,
    savedCommands,
    selectedSavedCommand,
    setSelectedSavedCommand,
    saveCommand,
    loadCommand,
    generateCommand
  };
};
