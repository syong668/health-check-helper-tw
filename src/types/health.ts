export type HealthConcern = 'sleep' | 'stress' | 'energy'

export interface HealthCheckState {
  currentStep: number
  concerns: HealthConcern[]
}
