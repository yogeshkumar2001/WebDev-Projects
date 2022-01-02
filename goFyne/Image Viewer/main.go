package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strings"
	"strconv"
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/container"
	// "fyne.io/fyne/v2/widget"
	"fyne.io/fyne/v2/canvas"
	// "fyne.io/fyne/v2/theme"

)

func main() {
	a := app.New()
	w := a.NewWindow("Hello")
	w.Resize(fyne.NewSize(1000 , 400))
	root_src :="C:\\Users\\Yk959\\OneDrive\\Pictures";
	
	files ,err := ioutil.ReadDir(root_src);
	if  err !=nil{
		log.Fatal(err)
	}
	var picsArr[] string; 
	for _,file := range files {
		fmt.Println(file.Name() , file.IsDir());
		if file.IsDir() == false {
			extension := strings.Split(file.Name() , ".")[1];
			if extension == "png" || extension == "jpg" {
               picsArr = append(picsArr , root_src+ "\\" +file.Name()); 
			}
		}
	}
	tabs :=container.NewAppTabs(
		container.NewTabItem("Image - 0 " ,canvas.NewImageFromFile(picsArr[0])),
	)

	for i:=1; i<len(picsArr); i++ {
	var str string = "Image - "
    var n int = i
     result := str + strconv.Itoa(n)
		tabs.Append(container.NewTabItem( result , canvas.NewImageFromFile(picsArr[i])))
	}

    tabs.SetTabLocation(container.TabLocationLeading);
	w.SetContent(tabs);
	w.ShowAndRun()
}