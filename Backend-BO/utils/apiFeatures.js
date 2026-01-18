class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search(field) {
    if (this.queryString.search) {
      this.query = this.query.find({
        [field]: { $regex: this.queryString.search, $options: "i" }
      });
    }
    return this;
  }

  filter() {
    this.query = this.query.find({ isDeleted: false });
    return this;
  }

  sort() {
    if (this.queryString.sortBy) {
      const order = this.queryString.order === "desc" ? -1 : 1;
      this.query = this.query.sort({ [this.queryString.sortBy]: order });
    }
    return this;
  }

  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default ApiFeatures;
