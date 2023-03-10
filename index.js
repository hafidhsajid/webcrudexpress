var express = require("express");

var app = express();

// app.use(express.static(__dirname+'template'))
// app.engine('html',require('ejs').renderFile);
const koneksi = require("./database");
var bodyParser = require("body-parser");
app.set("views", "./template");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var _data = [
  { name: "Sammy", organization: "DigitalOcean", birth_year: 2012 },
  { name: "Tux", organization: "Linux", birth_year: 1996 },
  { name: "Moby Dock", organization: "Docker", birth_year: 2013 },
];

app.get("/", function (req, res) {
  // res.sendFile(__dirname+'/template/read.html')
  var readquery = "SELECT * FROM Barang ";
  koneksi.query(readquery, (err, row, field) => {
    if (err) {
      return res.status(500).json({ message: "something wrong", err: err });
    }
    // console.log(row);
    res.render("read", {
      title: "Read Data from database",
      field: ["Nama Barang", "Harga", "Jumlah Stok", "Action"],
      // field:["Nama Barang", "Deskripsi", "Harga", "Jumlah Stok"],
      data: row,
    });
  });
});
app.get("/create", function (req, res) {
  var readquery = "SELECT * FROM Barang";
  koneksi.query(readquery, (err, row, field) => {
    if (err) {
      return res.status(500).json({ message: "something wrong", err: err });
    }
    res.render("detail", {
      title: "Detail Data from database",
      data: row,
    });
  });
});
app.get("/detail/:id", function (req, res) {
  var readquery = "SELECT * FROM Barang WHERE id = " + req.params.id;
  koneksi.query(readquery, (err, row, field) => {
    if (err) {
      return res.status(500).json({ message: "something wrong", err: err });
    }
    res.render("detail", {
      title: "Detail Data from database",
      data: row,
    });
  });
});
app.get("/edit/:id", function (req, res) {
  var readquery = "SELECT * FROM Barang WHERE id = " + req.params.id;
  koneksi.query(readquery, (err, row, field) => {
    if (err) {
      return res.status(500).json({ message: "something wrong", err: err });
    }
    res.render("edit", {
      title: "Edit Data from database",
      data: row,
    });
  });
});
app.post("/edit/:id", function (req, res) {
    
  var updatequery = "UPDATE Barang SET? WHERE id = "+req.params.id;
  var readquery = "SELECT * FROM Barang WHERE id = " + req.params.id;
  koneksi.query(readquery, (err, row, field) => {
    if (err) {
      return res.status(500).json({ message: "something wrong", err: err });
    }
    if (req.params.id != req.body.Id) {
        return res.status(400).json({ message: "Bad Request", err: err });
    }
    if (row.length) {
        
        koneksi.query(updatequery,[{
            Id:req.body.Id,
            Deskripsi:req.body.Deskripsi,
            NamaBarang:req.body.Nama,
            HargaJual:req.body.Harga,
            Stok:req.body.Stok

        },req.params.id],(err,row1,field1)=>{
            if(err){
                return res.status(500).json({ message: "something wrong", err: err });

            }
            return res.redirect("/");
            
        });
    }else{
        
        return res.status(400).json({ message: "Bad Request", err: err });
    }
    // return res
    //   .status(200)
    //   .json({ message: "Edited", data: req.body, err: err });
    // res.render("edit", {
    //   title: "Detail Data from database",
    //   data: row,
    // });
  });
});
app.post("/delete/:id", function (req, res) {
  var readquery = "SELECT * FROM Barang WHERE id = " + req.params.id;
  koneksi.query(readquery, (err, row, field) => {
    if (err) {
      return res.status(500).json({ message: "something wrong", err: err });
    }
    res.render("detail", {
      title: "Detail Data from database",
      data: row,
    });
  });
});

app.listen(process.env.server_port, () =>
  console.log(
    `Server running at: ${process.env.host}:${process.env.server_port}`
  )
);
