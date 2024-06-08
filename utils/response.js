const qrcode = require("qrcode");
const uuid = require("uuid");

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
 * @param {string} data
 */
exports.QrcodeGenerator = (data) => {
  try {
    const uniqueId = uuid.v4();
    data.employeeId = uniqueId //add uniqueId for the employee
    const dataInStringFormat = JSON.stringify(data);
    const path = `${uuid.v4()}.png`;
    qrcode.toFile(path, dataInStringFormat); //generate qrcode
    return true;
  } catch (err) {
    throw new Error(`Qrcode Generation failed: ${err.message}`);
    console.log(err);
    return false;
  }
};
