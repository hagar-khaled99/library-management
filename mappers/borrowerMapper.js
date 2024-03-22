const BorrowerResDTO = require("../DTOs/borrowerResDTO");

class BorrowerMapper {
  static BorrowerToBorrowerResDTO(borrower) {
    return new BorrowerResDTO(borrower.id, borrower.name, borrower.email);
  }
}

module.exports = BorrowerMapper;
