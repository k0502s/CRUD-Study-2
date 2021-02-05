module.exports = (mongoose, mongoosePaginate) => {
const userSchema = mongoose.Schema({

    title: String,
    description: String,
    published: Boolean


}, { timestamps: true });

//프로튼엔드 쪽인 데이터의 키 값이_id이 아니라 id이므로 재정의 해줌
userSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  userSchema.plugin(mongoosePaginate);

  const Tutorials = mongoose.model('tutorials', userSchema)
  return Tutorials;
};

