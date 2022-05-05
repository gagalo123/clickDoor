const appId = "tzlEK4yAD7Ec5ROaftB2UaMv-gzGzoHsz";
const appKey = "KVOFaQ2DiILzIUoQVbCIIgVn";
const serverURL = "https://OLoj899I.lc-cn-n1-shared.com";



function SubmitInformation() {
    LC.init({ appId, appKey, serverURL });
    const info = prompt("Please input your SN and NAME eg.2100810500张三");
    // LC.User.signUp({
    //     username: info,
    //     password: String(MaxClickCnt)
    // })
    LC.CLASS("Product")
        .add({
            title: info,
            price: parseFloat(String(MaxClickCnt)),
            // description: $("#inputDescription").val(),
            // owner: currentUser,
            // image: lcFile,
        });
}