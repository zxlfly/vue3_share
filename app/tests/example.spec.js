function addnum1(num){
    return num +1
}
test('addnum',()=>{
    expect(addnum1(1)).toBe(2)
})