
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type ViewMode = 'donor' | 'recipient';

interface BloodTypeInfo {
  canDonateTo: BloodType[];
  canReceiveFrom: BloodType[];
}

export const bloodTypeData: Record<BloodType, BloodTypeInfo> = {
  'A+': {
    canDonateTo: ['A+', 'AB+'],
    canReceiveFrom: ['A+', 'A-', 'O+', 'O-']
  },
  'A-': {
    canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
    canReceiveFrom: ['A-', 'O-']
  },
  'B+': {
    canDonateTo: ['B+', 'AB+'],
    canReceiveFrom: ['B+', 'B-', 'O+', 'O-']
  },
  'B-': {
    canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
    canReceiveFrom: ['B-', 'O-']
  },
  'AB+': {
    canDonateTo: ['AB+'],
    canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  'AB-': {
    canDonateTo: ['AB+', 'AB-'],
    canReceiveFrom: ['A-', 'B-', 'AB-', 'O-']
  },
  'O+': {
    canDonateTo: ['A+', 'B+', 'AB+', 'O+'],
    canReceiveFrom: ['O+', 'O-']
  },
  'O-': {
    canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    canReceiveFrom: ['O-']
  }
};

export const getAllBloodTypes = (): BloodType[] => {
  return Object.keys(bloodTypeData) as BloodType[];
};

export const getCompatibleTypes = (bloodType: BloodType, mode: ViewMode): BloodType[] => {
  if (mode === 'donor') {
    return bloodTypeData[bloodType].canDonateTo;
  } else {
    return bloodTypeData[bloodType].canReceiveFrom;
  }
};

export const isCompatible = (fromType: BloodType, toType: BloodType): boolean => {
  return bloodTypeData[fromType].canDonateTo.includes(toType);
};
