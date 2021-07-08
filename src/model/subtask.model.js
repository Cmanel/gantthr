const makeSubtask = (sequelize, Sequelize) => {
  const Subtask= sequelize.define('subtask',{
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
},
  //Requestor Entity - 2 digits Siglum - selection - Mandatory
  requestorEntity:{
      type:Sequelize.STRING(2),
      notEmpty: true
  },
  //Accountable Focal point mail -  free text + use previous data for the associated entity - Mandatory 255carac?
  accountableFocalPointMail:{
    type:Sequelize.STRING,
    notEmpty: true
},
//Task name - free short text  + use previous data for the associated entity - Mandatory
taskName:{
  type:Sequelize.STRING,
  notEmpty: true
},
  //Task type - selection: information, action - Mandatory
  taskType:{
    type:Sequelize.STRING,
    notEmpty: true
  },
  //Sub task name - free short text  + use previous data for the associated entity - Mandatory
  subTaskName:{
    type:Sequelize.STRING,
    notEmpty: true
  },
  //Sub Task Description - Free text (paragraph)
  subTaskDescription:{
    type:Sequelize.STRING,
    notEmpty: false
  },
  //Sub task Recurrence - Selection: No, Yearly, quarterly, monthly + possible to add - Mandatory 
  subTaskRecurrence:{
    type:Sequelize.STRING,
    notEmpty: true
  },
  //Sub task Start Date - Date (calendar selection) - Mandatory
  subTaskStartDate:{
    type:Sequelize.DATE,
    notEmpty: true
  },
  //Sub task End Date - Date (calendar selection)  - Mandatory
  subTaskEndDate:{
    type:Sequelize.DATE,
    notEmpty: true
  },
  //Division/Subs Applicability - Selection: All, Airbus Defence & Space, Airbus Helicopters, Airbus Commercial, Regions, ASA, ATR  - Mandatory
  divisionSubsApplicability:{
    type:Sequelize.STRING,
    notEmpty: true
  },
  //Impacted HR organization - Selection: All,2 digits siglum - Mandatory
  impactedHROrganization:{
    type:Sequelize.STRING,
    notEmpty: true
  },
  //Scope applicability - Selection: All, Non Production, Production - Mandatory
  scopeApplicability:{
    type:Sequelize.STRING,
    notEmpty: true
  },
  //Grading/Level Applicability - Selection:All,Executive,Senior Manager, Band V,Below Band V, Non Cadre - multiple selection feasible - Mandatory
  gradingLevelApplicability:{
    type:Sequelize.STRING,
    notEmpty: true
  },
 // Geographical Applicability - Selection: Transnational,Country,Site - Mandatory
 geographicalApplicability:{
  type:Sequelize.STRING,
  notEmpty: true
},
//Country Geographical Applicability- Selection: All, list  - Mandatory
countryGeographicalApplicability:{
  type:Sequelize.STRING,
  notEmpty: true
},
//Site - Selection: All, list  - Mandatory
site:{
  type:Sequelize.STRING,
  notEmpty: true
},
//Task Validation - Selection: Yes/No/To be discussed - “To be discussed” by default - only enhanced writer role will be able to update this field
taskValidation:{
  type:Sequelize.STRING,
  notEmpty: true
},
//Task closure confirmation -)
taskClosureConfirmation:{
  type:Sequelize.BOOLEAN,
  notEmpty: true,
  defaultValue: false
},
},{
  timestamps: false
});
return Subtask;
  }
  export default makeSubtask;


