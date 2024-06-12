const qrcode = require("qrcode");
const uuid = require("uuid");
const Joi = require("joi");

/**
 *
 * @param {boolean} status
 * @param {string} message
 * @returns
 */

exports.Response = (status, message) => {
  return { status: status, message: message };
};

/**
 *
 * @param {Object} schema - This is the Joi Schema to be validated
 * @param {Object} dataObject - This is out json object from the client
 */
exports.Validate = (schema, dataObject) => {
  const schemaValidation = schema.validate(dataObject);
  if (schemaValidation.error) {
    throw new Error(schemaValidation.error.message);
  }
};

/**
 *
 * @param {string} data
 */
exports.QrcodeGenerator = (data) => {
  try {
    const uniqueId = uuid.v4().replace("-", "");
    data.employeeId = uniqueId; //add uniqueId for the employee
    const dataInStringFormat = JSON.stringify(data); //converts data to string
    const path = `${uuid.v4()}.png`; //set file path
    qrcode.toFile(path, dataInStringFormat); //generate qrcode
    return true;
  } catch (err) {
    throw new Error(`Qrcode Generation failed: ${err.message}`);
    console.log(err);
    return false;
  }
};

exports.employeeRegistrationSchema = Joi.object({
  employeeName: Joi.string().min(3).max(40).required(),
  employeeDepartment: Joi.string().min(3).max(40).required(),
});
